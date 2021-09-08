import { html, LitElement } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { getVMData } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function rowSingleSelect() {
  const selectableData = getVMData();
  selectableData[1].selected = true;

  @customElement('demo-grid-row-single-select')
  class DemoRowSingleSelect extends LitElement {
    @state() private data = selectableData;

    @state() private selectedItem = selectableData[1];

    render() {
      return html`
        <cds-grid aria-label="row single select datagrid demo" height="360">
          <cds-grid-column type="action" aria-label="host selection column"></cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row .selected=${entry.selected}>
            <cds-grid-cell>
              <cds-radio>
                <input type="radio" name="hosts" .checked=${entry.selected} value=${entry.id} aria-label="select host ${entry.id}" @click=${(e: any) => this.select(entry, e.target.checked)} />
              </cds-radio>
            </cds-grid-cell>
            <cds-grid-cell>
              ${entry.id}
            </cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer>
            Selected: ${this.selectedItem.id}
          </cds-grid-footer>
        </cds-grid>
      `;
    }

    private select(entry: any, checked: boolean) {
      this.data.forEach(i => (i.selected = false));
      this.selectedItem = this.data.find(i => i.id === entry.id);
      this.selectedItem.selected = checked;
      this.data = [...this.data];
    }
  }
  return html`<demo-grid-row-single-select></demo-grid-row-single-select>`;
}