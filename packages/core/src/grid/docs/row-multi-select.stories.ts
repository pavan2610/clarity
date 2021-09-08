import { html, LitElement } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { getVMData, TestVM } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function rowMultiSelect() {
  const selectableData = getVMData()
  selectableData[1].selected = true;
  selectableData[3].selected = true;

  @customElement('demo-grid-row-multi-select')
  class DemoRowMultiSelect extends LitElement {
    @state() private data = selectableData;

    get selected() {
      return this.data.filter(i => i.selected).length;
    }

    render() {
      return html`
        <cds-grid aria-label="row multi select datagrid demo" aria-multiselectable="true" height="360">
          <cds-grid-column type="action">
            <cds-checkbox>
              <input type="checkbox" .checked=${this.selected === this.data.length} .indeterminate=${(this.selected > 0) && (this.selected < this.data.length)} @change=${(e: any) => this.selectAll(e)} aria-label="select all hosts" />
            </cds-checkbox>
          </cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row .selected=${entry.selected}>
            <cds-grid-cell>
              <cds-checkbox>
                <input type="checkbox" .checked=${entry.selected} value=${entry.id} @change=${(e: any) => this.select(entry, e)} aria-label="select host ${entry.id}" />
              </cds-checkbox>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer>${this.data.filter(i => i.selected).length} selected</cds-grid-footer>
        </cds-grid>`;
    }

    private select(entry: TestVM, e: Event) {
      this.data.find(i => i.id === entry.id).selected = (e.target as HTMLInputElement).checked;
      this.data = [...this.data];
    }

    private selectAll(e: Event) {
      this.data.forEach(i => (i.selected = (e.target as HTMLInputElement).checked));
      this.data = [...this.data];
    }
  }
  return html`<demo-grid-row-multi-select></demo-grid-row-multi-select>`;
}
