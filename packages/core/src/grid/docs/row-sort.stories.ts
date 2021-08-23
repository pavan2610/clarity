import { html, LitElement, PropertyValues } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { getVMData, sortStrings, TestVM } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function rowSort() {
  @customElement('demo-grid-row-sort') // @ts-ignore
  class DemoRowSort extends LitElement {
    @state() private data = getVMData();
    @state() private filteredList: TestVM[] = [];
    @state() private sortType: 'none' | 'ascending' | 'descending' = 'none';

    render() {
      return html`
        <cds-grid aria-label="row sort datagrid demo" height="360">
          <cds-grid-column>
            Host <cds-action-sort aria-label="sort hosts" .sort=${this.sortType} @sortChange=${(e: any) => (this.sortType = e.detail)}></cds-action-sort>
          </cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
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
        </cds-grid>`;
    }

    updated(props: PropertyValues) {
      super.updated(props);
      if (props.has('sortType') && props.get('sortType') !== this.sortType) {
        this.filteredList = sortStrings([...this.data], 'id', this.sortType);
      }
    }
  }
  return html`<demo-grid-row-sort></demo-grid-row-sort>`;
}