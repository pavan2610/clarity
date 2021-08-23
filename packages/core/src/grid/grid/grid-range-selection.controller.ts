import { ReactiveControllerHost } from 'lit';
import { CdsGridCell } from '../cell/grid-cell.element.js';
import { CdsGridRow } from '../row/grid-row.element.js';

export class GridRangeSelectionController {
  private selectionActive = false;
  private firstCell: CdsGridCell;
  private activeCell: CdsGridCell;

  private get enabled() {
    return this.host.rangeSelection && !Array.from(this.host.rows).find(r => r.draggable);
  }

  constructor(
    private host: ReactiveControllerHost &
      HTMLElement & {
        cells: NodeListOf<CdsGridCell> | CdsGridCell[];
        rows: NodeListOf<CdsGridRow>;
        rangeSelection: boolean;
      }
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
    this.host.cells.forEach(cell => cell.removeAttribute('highlight'));
  }

  private calculateSelection() {
    const x1 = parseInt(this.firstCell.ariaColIndex);
    const x2 = parseInt(this.activeCell.ariaColIndex);
    const y1 = parseInt(this.firstCell.parentElement.ariaRowIndex);
    const y2 = parseInt(this.activeCell.parentElement.ariaRowIndex);

    this.resetAllActiveCells();
    this.host.cells.forEach((cell: CdsGridCell) => {
      const colIndex = parseInt(cell.ariaColIndex);
      const rowIndex = parseInt(cell.parentElement.ariaRowIndex);
      if ((x1 <= x2 && colIndex >= x1 && colIndex <= x2) || (x1 >= x2 && colIndex <= x1 && colIndex >= x2)) {
        if ((y1 <= y2 && rowIndex >= y1 && rowIndex <= y2) || (y1 >= y2 && rowIndex <= y1 && rowIndex >= y2)) {
          cell.setAttribute('highlight', '');
        }
      }
    });

    this.host.dispatchEvent(
      new CustomEvent('rangeSelectionChange', {
        detail: Array.from(this.host.cells).filter(c => c.hasAttribute('highlight')),
      })
    );
  }
}
