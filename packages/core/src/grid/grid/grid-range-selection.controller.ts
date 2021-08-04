import { ReactiveControllerHost } from 'lit';
import { CdsGridCell } from '../cell/grid-cell.element.js';

export class GridRangeSelectionController {
  private selectionActive = false;
  private firstCell: CdsGridCell;
  private activeCell: CdsGridCell;

  private get enabled() {
    return this.host.rangeSelection && !Array.from(this.host.rows).find(r => r.draggable);
  }

  constructor(
    private host: ReactiveControllerHost &
      HTMLElement & { cells: NodeListOf<any> | any[]; rows: NodeListOf<any>; rangeSelection: boolean }
  ) {
    host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.setupKeyboardListeners();
    this.setupMouseEvents();
  }

  private setupMouseEvents() {
    this.host.shadowRoot.addEventListener('mousedown', (e: any) => {
      // preserve right click for context menus & keyboard mouse control https://apple.stackexchange.com/questions/32715/how-do-i-open-the-context-menu-from-a-mac-keyboard
      if (this.enabled && e.buttons === 1 && !e.ctrlKey) {
        this.setFirstCell(e);
      }
    });

    this.host.shadowRoot.addEventListener('mouseover', (e: any) => {
      if (this.enabled) {
        this.setActiveCell(e.composedPath().find((i: any) => i.tagName === 'CDS-GRID-CELL'));
      }
    });

    this.host.shadowRoot.addEventListener('mouseup', () => {
      if (this.enabled) {
        this.stopSelection();
      }
    });
  }

  private setupKeyboardListeners() {
    this.host.addEventListener('cdsKeyChange', (e: any) => {
      if (this.enabled) {
        this.setActiveCell(e.detail.activeItem);

        if (!e.detail.shiftKey) {
          this.stopSelection();
          this.resetAllActiveCells();
          this.host.dispatchEvent(new CustomEvent('rangeSelectionChange', { detail: [] }));
        }
      }
    });

    this.host.addEventListener('keydown', (e: any) => {
      if (this.enabled && e.code === 'ShiftLeft' && e.shiftKey && !this.selectionActive) {
        this.setFirstCell(e);
      }
    });
  }

  private setFirstCell(e: any) {
    const firstCell = e.composedPath().find((i: any) => i.tagName === 'CDS-GRID-CELL');
    if (firstCell) {
      this.firstCell = firstCell;
      this.selectionActive = true;
      this.resetAllActiveCells();
    }
  }

  private setActiveCell(activeCell: CdsGridCell) {
    if (activeCell && this.selectionActive) {
      this.activeCell = activeCell;
      this.calculateSelection();
    }
  }

  private stopSelection() {
    this.selectionActive = false;
  }

  private resetAllActiveCells() {
    this.host.cells.forEach((cell: any) => (cell.active = false));
  }

  private calculateSelection() {
    const x1 = this.firstCell.colIndex;
    const x2 = this.activeCell.colIndex;
    const y1 = this.firstCell.rowIndex;
    const y2 = this.activeCell.rowIndex;

    this.resetAllActiveCells();
    this.host.cells.forEach((cell: CdsGridCell) => {
      if (
        (x1 <= x2 && cell.colIndex >= x1 && cell.colIndex <= x2) ||
        (x1 >= x2 && cell.colIndex <= x1 && cell.colIndex >= x2)
      ) {
        if (
          (y1 <= y2 && cell.rowIndex >= y1 && cell.rowIndex <= y2) ||
          (y1 >= y2 && cell.rowIndex <= y1 && cell.rowIndex >= y2)
        ) {
          cell.active = true;
        }
      }
    });

    this.host.dispatchEvent(
      new CustomEvent('rangeSelectionChange', { detail: Array.from(this.host.cells).filter(c => c.active) })
    );
  }
}
