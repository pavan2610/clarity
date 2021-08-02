import { ReactiveControllerHost } from 'lit';

export type GridA11y = ReactiveControllerHost &
  HTMLElement & {
    grid?: HTMLElement;
    columns: NodeListOf<HTMLElement>;
    rows: NodeListOf<HTMLElement & { cells: NodeListOf<HTMLElement> }>;
  };

export class GridA11yController {
  constructor(private host: GridA11y) {
    host.addController(this);
  }

  hostConnected() {
    this.intializeColumnSort();
  }

  initialize() {
    this.initializeGrid();
    this.intializeColumns();
    this.initializeRows();
  }

  private intializeColumnSort() {
    this.host.addEventListener('sortChange', (e: any) => {
      e.composedPath()
        .find((i: any) => i.getAttribute && i.getAttribute('role') === 'columnheader')
        ?.setAttribute('aria-sort', e.detail);
    });
  }

  private initializeGrid() {
    const grid = this.host.grid ? this.host.grid : this.host;
    grid.setAttribute('role', 'grid');
    this.host.setAttribute('aria-rowcount', `${this.host.rows.length + 1}`); // +1 for column header row offset
    this.host.setAttribute('aria-colcount', `${this.host.columns.length}`);
  }

  private intializeColumns() {
    this.host.columns.forEach((c, i) => {
      c.setAttribute('role', 'columnheader');
      c.setAttribute('aria-colindex', `${i + 1}`);

      if (c.querySelector('cds-action-sort')) {
        c.setAttribute('aria-sort', 'none');
      }
    });
  }

  private initializeRows() {
    this.host.rows.forEach((r, i) => {
      r.setAttribute('role', 'row');
      r.setAttribute('aria-rowindex', `${i + 2}`); // +2 for column header row offset
      this.initializeCells(r.cells);
    });
  }

  private initializeCells(cells: NodeListOf<HTMLElement>) {
    cells.forEach((c, i) => {
      if (!c.hasAttribute('role')) {
        c.setAttribute('role', 'gridcell');
      }

      c.setAttribute('aria-colindex', `${i + 1}`); // colindex starts at 1
    });
  }
}
