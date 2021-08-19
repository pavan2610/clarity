import { html, LitElement } from 'lit';
import { customElement, registerElementSafely, state } from '@cds/core/internal';
import { getVMData, groupArray } from '@cds/core/demo';
import { CdsGridCell } from '@cds/core/grid';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function rangeSelect() {
  @customElement('demo-grid-selectable-cells') // @ts-ignore
  class DemoSelectableCells extends LitElement {
    @state() private data = getVMData();
    @state() private activeCells: CdsGridCell[] = [];

    render() {
      return html`
        <cds-grid aria-label="range selection datagrid demo" @rangeSelectionChange=${(e: any) => this.activeCells = e.detail} style="--body-height: 490px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`  
          <cds-grid-row id=${entry.id}>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer>
            <p cds-text="body">
              <strong>CPU:</strong>
              ${(this.activeCells.filter(c => c.colIndex === 3).reduce((prev, cell) => prev + this.data.find(i => i.id === cell.parentElement.id).cpu, 0) / (this.activeCells.length ? this.activeCells.length : 1)).toFixed(2)}%
              <strong>Memory:</strong>
              ${(this.activeCells.filter(c => c.colIndex === 4).reduce((prev, cell) => prev + this.data.find(i => i.id === cell.parentElement.id).memory, 0) / (this.activeCells.length ? this.activeCells.length : 1)).toFixed(2)}%
            </p>
          </cds-grid-footer>
        </cds-grid>
        <p cds-text="body">Active Cells: ${this.activeCells.map(c => html`(${c.colIndex},${c.rowIndex}) `)}</p>
      `;
    }
  }
  return html`<demo-grid-selectable-cells></demo-grid-selectable-cells>`;
}

export function rangeSelectContextMenu() {
  @customElement('demo-range-select-context-menu') // @ts-ignore
  class DemoRangeSelectContextMenu extends LitElement {
    @state() private rows = getVMData();
    @state() private columns = [{ label: 'Host', key: 'id' }, { label: 'Status', key: 'status' }, { label: 'CPU', key: 'cpu' }, { label: 'Memory', key: 'memory' }];
    @state() private activeCells: CdsGridCell[] = [];
    @state() private anchor?: HTMLElement = null;
    @state() private csv: string;

    render() {
      return html`
        <cds-grid aria-label="range select context menu datagrid demo" @rangeSelectionChange=${(e: any) => this.activeCells = e.detail} style="--body-height: 490px">
          ${this.columns.map(c => html`<cds-grid-column>${c.label}</cds-grid-column>`)}
          ${this.rows.map(entry => html`  
          <cds-grid-row id=${entry.id}>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        <cds-dropdown ?hidden=${!this.anchor} .anchor=${this.anchor} @closeChange=${() => (this.anchor = null) as void}>
          <cds-button action="flat" size="sm" @click=${() => this.exportToCSV()}>Export to CSV</cds-button>
          <cds-button action="flat" size="sm" @click=${() => this.logCSV()}>Log CSV</cds-button>
        </cds-dropdown>
        <pre cds-text="body">${this.csv}</pre>`;
    }

    connectedCallback() {
      super.connectedCallback();
      window.addEventListener('contextmenu', (e: any) => {
        const cell = e.path.find((e: any) => e.tagName === 'CDS-GRID-CELL');
        if (this.activeCells.length && cell?.active && e.target === this) {
          e.preventDefault();
          this.anchor = cell;
        }
      });
    }

    private logCSV() {
      const columns = Array.from(new Set(this.activeCells.map(c => c.colIndex - 1))).map(i => this.columns[i].label);
      const rows = groupArray(this.activeCells.map(c => (this.rows[c.rowIndex - 1] as any)[this.columns[c.colIndex - 1].key]), columns.length).map(c => c.join(',')).join('\n');
      this.csv = `${columns.join(',')}\n${rows}`;
      this.anchor = null;
    }

    private exportToCSV() {
      this.logCSV();
      const a = document.createElement('a');
      a.href = `data:application/octet-stream,${encodeURIComponent(this.csv)}`;
      a.download = 'download.csv';
      a.click();
    }
  }
  return html`<demo-range-select-context-menu></demo-range-select-context-menu>`;
}