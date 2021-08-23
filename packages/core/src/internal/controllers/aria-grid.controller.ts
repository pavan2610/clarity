import { ReactiveControllerHost } from 'lit';
import { isSafari } from '../utils/browser.js';

export type GridA11y = ReactiveControllerHost &
  HTMLElement & {
    columnGroup: HTMLElement;
    columnRow: HTMLElement;
    columns: NodeListOf<HTMLElement>;
    rowGroup: HTMLElement;
    rows: NodeListOf<HTMLElement & { cells: NodeListOf<HTMLElement> }>;
  };

export class AriaGridController {
  private observers: MutationObserver[] = [];

  constructor(private host: GridA11y) {
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
    this.initializeGrid();
    this.intializeColumns();
    this.initializeRows();
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
    this.host.role = 'grid';
    this.host.rowGroup.role = 'rowgroup';
    this.host.columnGroup.role = 'rowgroup';
    this.host.columnRow.role = 'row';
    this.host.columnRow.ariaRowIndex = '1';
    this.host.ariaRowCount = `${this.host.rows?.length + 1}`;
    this.host.ariaColCount = `${this.host.columns.length}`;
  }

  private intializeColumns() {
    this.host.columns.forEach((c, i) => {
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
    this.host.rows?.forEach((r, i) => {
      r.role = 'row';
      r.ariaRowIndex = `${i + 2}`; // +2 for column header row offset
      this.initializeCells(r.cells);
    });
  }

  private initializeCells(cells: NodeListOf<HTMLElement>) {
    cells?.forEach((c, i) => {
      if (!c.role) {
        c.role = 'gridcell';
      }

      c.ariaColIndex = `${i + 1}`; // colindex starts at 1
    });
  }
}
