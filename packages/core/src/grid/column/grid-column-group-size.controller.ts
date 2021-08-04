import { onChildListMutation, onFirstInteraction } from '@cds/core/internal';
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

    onFirstInteraction(this.host, () => this.initializeColumnWidths());

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
      Array.from(this.host.columns)
        .filter(c => !c.hidden)
        .forEach(c =>
          this.host.style.setProperty(
            `--ch${c.colIndex}`,
            c.width ? c.width : `${parseInt(getComputedStyle(c).width)}px`
          )
        );
    }
  }

  private createColumnGrids() {
    const columns = Array.from(this.host.columns);
    columns[this.host.getAttribute('dir') === 'rtl' ? 0 : columns.length - 1].resizable = 'hidden';

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
