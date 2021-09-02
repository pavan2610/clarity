import { html, LitElement } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { getVMData, swapItems, TestVM } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function rowDraggable() {
  @customElement('demo-grid-row-draggable') // @ts-ignore
  class DemoRowDraggable extends LitElement {
    @state() private data = getVMData();
    @state() private ariaLiveMessage = '';

    render() {
      return html`
        <cds-grid aria-label="row draggable datagrid demo" @cdsDraggableChange=${this.sortList} height="360">
          <cds-grid-column type="action" aria-label="draggable action column"></cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row draggable="true" id=${entry.id}>
            <cds-grid-cell>
              <cds-action-handle aria-label="sort ${entry.id} row"></cds-action-handle>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-placeholder draggable="false"></cds-grid-placeholder>
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        <p>aria-live:</p>
        <div aria-live="assertive" role="log" aria-atomic="true">${this.ariaLiveMessage}</div>`;
    }

    private sortList(e: any) {
      if (e.detail.type === 'drop') {
        this.data = [...swapItems<TestVM>(e.detail.target, e.detail.from, this.data)];
        this.ariaLiveMessage = `host ${e.detail.from.id} dropped at row ${this.data.findIndex(i => i.id === e.detail.target.id) + 1}`;
      } else if (e.detail.type === 'dragstart') {
        this.ariaLiveMessage = `host ${e.detail.from.id} grabbed`;
      }
    }
  }
  return html`<demo-grid-row-draggable></demo-grid-row-draggable>`;
}