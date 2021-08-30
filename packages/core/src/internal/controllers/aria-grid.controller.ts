import { ReactiveControllerHost } from 'lit';
import { isSafari } from '../utils/browser.js';

export interface AriaGrid {
  grid: HTMLElement;
  rows: NodeListOf<HTMLElement>;
  rowGroup: HTMLElement;
  cells: NodeListOf<HTMLElement>;
  columns: NodeListOf<HTMLElement>;
  columnRow: HTMLElement;
  columnGroup: HTMLElement;
}

export class AriaGridController {
  private observers: MutationObserver[] = [];

  private grid: AriaGrid;

  constructor(private host: ReactiveControllerHost & HTMLElement & AriaGrid) {
    host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.intializeColumnSort();
    this.update();

    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          this.host.updateComplete.then(() => this.update());
        }
      }
    });

    this.observers.push(observer);
    observer.observe(this.host, { childList: true });
  }

  hostDisconnected() {
    this.observers.forEach(o => o.disconnect());
  }

  update() {
    // create one copy per update to prevent multiple DOM queries from @query getters
    this.grid = {
      grid: this.host.grid ? this.host.grid : this.host,
      rows: this.host.rows,
      rowGroup: this.host.rowGroup,
      cells: this.host.cells,
      columns: this.host.columns,
      columnRow: this.host.columnRow,
      columnGroup: this.host.columnGroup
    };

    this.initializeGrid();
    this.intializeColumns();
    this.initializeRows();
    this.initializeCells();
  }

  private intializeColumnSort() {
    this.host.addEventListener('sortChange', (e: any) => {
      const col = e.composedPath().find((i: HTMLElement) => i.role === 'columnheader');
      if (col) {
        col.ariaSort = e.detail;
      }
    });
  }

  private initializeGrid() {
    this.grid.grid.role = 'grid';
    this.grid.grid.ariaRowCount = `${this.grid.rows?.length + 1}`;
    this.grid.grid.ariaColCount = `${this.grid.columns.length}`;
    this.grid.rowGroup.role = 'rowgroup';
    this.grid.columnGroup.role = 'rowgroup';
    this.grid.columnRow.role = 'row';
    this.grid.columnRow.ariaRowIndex = '1';
  }

  private intializeColumns() {
    this.grid.columns.forEach((c, i) => {
      c.role = 'columnheader';
      c.ariaColIndex = `${i + 1}`;
      c.ariaSort = 'none';

      if (isSafari()) {
        // Only visible columnheader text should be read to SRs but Safari violates this and
        // reads the aria-label of buttons when navigating between cells.
        // Combining scope + aria-label tricks Safari + VO into the correct behavior
        c.setAttribute('scope', 'col');
        c.ariaLabel = c.textContent;
      }
    });
  }

  private initializeRows() {
    this.grid.rows?.forEach((r, i) => {
      r.role = 'row';
      r.ariaRowIndex = `${i + 2}`; // +2 for column header row offset
    });
  }

  private initializeCells() {
    const colsCount = this.grid.columns.length;
    this.grid.cells?.forEach((c, i) => {
      if (!c.role) {
        c.role = 'gridcell';
      }
      c.ariaColIndex = `${i % colsCount + 1}`; // colindex starts at 1
    });
  }
}
