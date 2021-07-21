import { ReactiveControllerHost } from 'lit';

export type GridColumnGroupSize = ReactiveControllerHost &
  HTMLElement & {
    columns: NodeListOf<HTMLElement & { width?: string; colIndex?: number }>;
    columnLayout: 'fixed' | 'flex';
  };

export class GridColumnGroupSizeController {
  constructor(private host: GridColumnGroupSize) {
    host.addController(this as any);
  }

  initializeColumnWidths() {
    if (this.host.columnLayout === 'fixed') {
      Array.from(this.host.columns)
        .filter(column => !column.hidden)
        .forEach(column =>
          this.host.style.setProperty(
            `--ch${column.colIndex}`,
            column.width ? `${column.width}px` : `${parseInt(getComputedStyle(column).width)}px`
          )
        );
    }
  }

  createColumnGrids() {
    const columns = Array.from(this.host.columns).filter(c => !c.hidden);

    const colWidths = columns.reduce(
      (p, c) => `${p} ${`var(--ch${c.colIndex}, ${c.width ? `${c.width}px` : '1fr'})`}`,
      ''
    );
    this.host.style.setProperty('--ch-grid', colWidths);

    const rowColWidths = columns.reduce(
      (p, c) => `${p} ${`var(--c${c.colIndex}, ${c.width ? `${c.width}px` : '1fr'})`}`,
      ''
    );
    this.host.style.setProperty('--c-grid', rowColWidths);
  }
}
