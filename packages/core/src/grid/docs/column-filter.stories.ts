import { html, LitElement, PropertyValues } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { filter, getVMData, TestVM } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function columnFilter() {
  @customElement('demo-grid-column-filter') // @ts-ignore
  class DemoColumnFilter extends LitElement {
    @state() private data = getVMData();
    @state() private filteredList: TestVM[] = [];
    @state() private search = '';
    @state() private anchor: HTMLElement = null

    render() {
      return html`
        <cds-grid aria-label="column filter datagrid demo" height="360">
          <cds-grid-column>
            Host <cds-action popup="column-filter" @click=${(e: any) => (this.anchor = e.target)} shape="filter" .status=${this.search ? 'active' : ''} aria-label="search hosts"></cds-action>
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
        </cds-grid>
        <cds-dropdown id="column-filter" ?hidden=${!this.anchor} @closeChange=${() => (this.anchor = null) as any} .anchor=${this.anchor}>
          <cds-input>
            <input type="text" aria-label="search hosts" placeholder="Search" .value=${this.search} @input=${(e: any) => (this.search = e.target.value)} />
          </cds-input>
        </cds-dropdown>`;
    }

    updated(props: PropertyValues) {
      super.updated(props);
      if (props.has('search') && props.get('search') !== this.search) {
        this.filteredList = filter([...this.data], 'id', this.search);
      }
    }
  }
  return html`<demo-grid-column-filter></demo-grid-column-filter>`;
}