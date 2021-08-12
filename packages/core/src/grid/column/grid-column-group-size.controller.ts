import { onChildListMutation } from '@cds/core/internal';
import { ReactiveControllerHost } from 'lit';

export type ColumnSizeType = HTMLElement & {
  width?: string;
  colIndex?: number;
  type?: string;
  resizable?: true | false | 'hidden';
};
export type GridColumnGroupSize = ReactiveControllerHost &
  HTMLElement & {
    columns: NodeListOf<ColumnSizeType> | ColumnSizeType[];
    columnLayout: 'fixed' | 'flex';
  };

export class GridColumnGroupSizeController {
  private observers: MutationObserver[] = [];

  constructor(private host: GridColumnGroupSize) {
    host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.createColumnGrids();
    this.host.addEventListener('resizeChange', () => this.initializeColumnWidths(), { once: true, capture: true });

    this.observers.push(
      onChildListMutation(this.host, async () => {
        await this.host.updateComplete;
        this.createColumnGrids();
      })
    );
  }

  hostDisconnected() {
    this.observers.forEach(o => o.disconnect());
  }

  private initializeColumnWidths() {
    if (this.host.columnLayout === 'fixed') {
      const columns = Array.from(this.host.columns);

      columns.filter(c => !c.hidden && c.width).forEach(c => this.host.style.setProperty(`--ch${c.colIndex}`, c.width));

      columns
        .filter(c => !c.hidden && !c.width && c.colIndex !== columns.length)
        .forEach(c => this.host.style.setProperty(`--ch${c.colIndex}`, `${parseInt(getComputedStyle(c).width)}px`));

      const lastCol = columns.find(c => !c.hidden && c.colIndex === columns.length);
      const lastColWidth = lastCol.width ? lastCol.width : `${parseInt(getComputedStyle(lastCol).width)}px`;
      this.host.style.setProperty(`--ch${lastCol.colIndex}`, `minmax(${lastColWidth}, 100%)`);
    }
  }

  private createColumnGrids() {
    const columns = Array.from(this.host.columns);

    const colWidths = columns
      .filter(c => !c.hidden)
      .reduce((p, c) => `${p} ${`var(--ch${c.colIndex}, ${c.width ? c.width : '1fr'})`}`, '');
    this.host.style.setProperty('--ch-grid', colWidths);

    const rowColWidths = columns
      .filter(c => !c.hidden)
      .reduce((p, c) => `${p} ${`var(--c${c.colIndex}, ${c.width ? c.width : '1fr'})`}`, '');
    this.host.style.setProperty('--c-grid', rowColWidths);
  }
}
