import { html, LitElement } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { getVMData } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function columnDraggable() {
  @customElement('demo-grid-column-draggable') // @ts-ignore
  class DemoColumnDraggable extends LitElement {
    @state() private data = getVMData();
    @state() private columns = [{ label: 'Host', key: 'id' }, { label: 'Status', key: 'status' }, { label: 'CPU', key: 'cpu'}, { label: 'Memory', key: 'memory' }];
    @state() private ariaLiveMessage = '';

    render() {
      return html`
        <cds-grid aria-label="column draggable datagrid demo" @cdsDraggableChange=${this.sortColumns} height="360">
          ${this.columns.map(c => html`
            <cds-grid-column draggable="true" column-key="${c.key}">
              ${c.label} <cds-action-handle aria-label="sort ${c.label} column"></cds-action-handle>
            </cds-grid-column>`)}
          ${this.data.map((entry: any) => html`
            <cds-grid-row id=${entry.id}>
              ${this.columns.map(c => html`<cds-grid-cell>${entry[c.key]}</cds-grid-cell>`)}
            </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        <p>aria-live:</p>
        <div aria-live="assertive" role="log" aria-atomic="true">${this.ariaLiveMessage}</div>`;
    }

    private sortColumns(e: any) {
      if (e.detail.type === 'drop') {
        const targetIndex = parseInt(e.detail.target.getAttribute('aria-colindex')) - 1;
        const fromIndex = parseInt(e.detail.from.getAttribute('aria-colindex')) - 1;
        const items = [...this.columns];
        const item = items.splice(fromIndex, 1)[0];
        items.splice(targetIndex, 0, item);
        this.columns = [...items];
        this.ariaLiveMessage = `${e.detail.from.textContent} dropped at column ${e.detail.target.getAttribute('aria-colindex')}`;
      } else if (e.detail.type === 'dragstart') {
        this.ariaLiveMessage = `${e.detail.from.textContent} column grabbed`;
      }
    }
  }
  return html`<demo-grid-column-draggable></demo-grid-column-draggable>`;
}