import { ReactiveControllerHost } from 'lit';
import { isNumericString, onChildListMutation } from '@cds/core/internal';

export type ColumnSizeType = HTMLElement & {
  width?: string;
  ariaColIndex?: string;
  type?: string;
  resizable?: true | false | 'hidden';
};

export type GridColumnGroupSize = ReactiveControllerHost &
  HTMLElement & {
    columns: NodeListOf<ColumnSizeType> | ColumnSizeType[];
    columnLayout: 'fixed' | 'flex';
    height?: string;
  };

export class GridLayoutController {
  private observers: MutationObserver[] = [];

  private get columns() {
    return Array.from(this.host.columns);
  }

  private get visibleColumns() {
    return this.columns.filter(c => !c.hidden);
  }

  private get lastVisibleColumn() {
    return this.visibleColumns[this.host.getAttribute('dir') === 'rtl' ? 0 : this.visibleColumns.length - 1];
  }

  constructor(private host: GridColumnGroupSize) {
    host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.updateLayout();
    this.host.addEventListener('resizeChange', () => this.initializeColumnWidths(), { once: true, capture: true });

    this.observers.push(
      onChildListMutation(this.host, async mutation => {
        await this.host.updateComplete;
        if (this.columnAddedOrRemoved(mutation)) {
          this.updateLayout();
        }
      })
    );

    this.host.addEventListener('hiddenChange', () => this.updateLayout());
  }

  hostUpdated() {
    if (this.host.height) {
      this.host.style.setProperty(
        '--body-height',
        isNumericString(this.host.height) ? `${this.host.height}px` : this.host.height
      );
    }
  }

  hostDisconnected() {
    this.observers.forEach(o => o.disconnect());
  }

  private columnAddedOrRemoved(mutation: MutationRecord) {
    return [...Array.from(mutation.removedNodes), ...Array.from(mutation.addedNodes)].find(
      (i: any) => i.tagName === 'CDS-GRID-COLUMN'
    );
  }

  private initializeColumnWidths() {
    if (this.host.columnLayout === 'fixed') {
      this.visibleColumns
        .filter(c => c.width)
        .forEach(c => this.host.style.setProperty(`--ch${c.ariaColIndex}`, c.width));

      this.visibleColumns
        .filter(c => !c.width && parseInt(c.ariaColIndex) !== this.columns.length)
        .forEach(c => this.host.style.setProperty(`--ch${c.ariaColIndex}`, `${parseInt(getComputedStyle(c).width)}px`));

      this.host.style.setProperty(
        `--ch${this.lastVisibleColumn.ariaColIndex}`,
        `minmax(${
          this.lastVisibleColumn.width ?? `${parseInt(getComputedStyle(this.lastVisibleColumn).width)}px`
        }, 100%)`
      );
    }
  }

  private updateLayout() {
    this.createColumnGrids();
    this.setColumnDividers();
  }

  private createColumnGrids() {
    const colWidths = this.columns
      .filter(c => !c.hidden)
      .reduce((p, c) => `${p} ${`var(--ch${c.ariaColIndex}, ${c.width ? c.width : '1fr'})`}`, '');

    this.host.style.setProperty('--ch-grid', colWidths);
  }

  private setColumnDividers() {
    this.visibleColumns.forEach((c, i) => {
      c.removeAttribute('draggable-hidden');

      if (c.type === 'action' && this.visibleColumns[i + 1].type === 'action') {
        c.setAttribute('draggable-hidden', '');
      }
    });
    this.lastVisibleColumn.setAttribute('draggable-hidden', '');
  }
}
