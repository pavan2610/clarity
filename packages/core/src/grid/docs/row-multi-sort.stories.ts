import { html, LitElement, PropertyValues } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { getVMData, sortStrings, TestVM } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function rowMultiSort() {
  @customElement('demo-grid-row-multi-sort') // @ts-ignore
  class DemoRowMultiSort extends LitElement {
    @state() private data = getVMData();
    @state() private filteredList: TestVM[] = [];
    @state() private sortState: { [key: string]: 'none' | 'ascending' | 'descending' } = { id: 'none', status: 'none' };

    render() {
      return html`
        <cds-grid aria-label="row multi sort datagrid demo" height="360">
          <cds-grid-column>
            Host <cds-action-sort aria-label="sort host" .sort=${this.sortState.id} @sortChange=${(e: any) => (this.sortState = { ...this.sortState, id: e.detail })}></cds-action-sort>
          </cds-grid-column>
          <cds-grid-column>
            Status <cds-action-sort aria-label="sort status" .sort=${this.sortState.status} @sortChange=${(e: any) => (this.sortState = { ...this.sortState, status: e.detail })}></cds-action-sort>
          </cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.filteredList.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
      `;
    }

    updated(props: PropertyValues) {
      super.updated(props);
      if (props.has('sortState')) {
        this.updateList();
      }
    }

    private updateList() {
      let list = [...this.data];
      list = sortStrings(list, 'id', this.sortState.id);
      list = sortStrings(list, 'status', this.sortState.status);
      this.filteredList = list;
    }
  }
  return html`<demo-grid-row-multi-sort></demo-grid-row-multi-sort>`;
}