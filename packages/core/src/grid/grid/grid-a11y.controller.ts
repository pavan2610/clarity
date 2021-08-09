import { ReactiveControllerHost } from 'lit';
import { isSafari } from '@cds/core/internal';

export type GridA11y = ReactiveControllerHost &
  HTMLElement & {
    grid?: HTMLElement;
    columns: NodeListOf<HTMLElement>;
    rows: NodeListOf<HTMLElement & { cells: NodeListOf<HTMLElement> }>;
  };

export class GridA11yController {
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
      e.composedPath()
        .find((i: any) => i.getAttribute && i.getAttribute('role') === 'columnheader')
        ?.setAttribute('aria-sort', e.detail);
    });
  }

  private initializeGrid() {
    const grid = this.host.grid ? this.host.grid : this.host;
    grid.setAttribute('role', 'grid');
    this.host.setAttribute('aria-rowcount', `${this.host.rows?.length + 1}`); // +1 for column header row offset
    this.host.setAttribute('aria-colcount', `${this.host.columns.length}`);
  }

  private intializeColumns() {
    this.host.columns.forEach((c, i) => {
      c.setAttribute('role', 'columnheader');
      c.setAttribute('aria-colindex', `${i + 1}`);

      if (isSafari()) {
        // Only visible columnheader text should be read to SRs but Safari violates this and
        // reads the aria-label of buttons when navigating between cells.
        // Combining scope + aria-label tricks Safari + VO into the correct behavior
        c.setAttribute('scope', 'col');
        c.setAttribute('aria-label', c.textContent);
      }

      if (c.querySelector('cds-action-sort')) {
        c.setAttribute('aria-sort', 'none');
      }
    });
  }

  private initializeRows() {
    this.host.rows?.forEach((r, i) => {
      r.setAttribute('role', 'row');
      r.setAttribute('aria-rowindex', `${i + 2}`); // +2 for column header row offset
      this.initializeCells(r.cells);
    });
  }

  private initializeCells(cells: NodeListOf<HTMLElement>) {
    cells?.forEach((c, i) => {
      if (!c.hasAttribute('role')) {
        c.setAttribute('role', 'gridcell');
      }

      c.setAttribute('aria-colindex', `${i + 1}`); // colindex starts at 1
    });
  }
}
