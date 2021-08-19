import { html, LitElement, PropertyValues } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { getVMData, TestVM } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function columnMultiFilter() {
  @customElement('demo-grid-column-multi-filter') // @ts-ignore
  class DemoColumnMultiFilter extends LitElement {
    @state() private data = getVMData();
    @state() private filteredList: TestVM[] = [];
    @state() private search = '';

    render() {
      return html`
        <section cds-layout="vertical gap:md">
          <cds-search control-width="shrink">
            <label>Search VMs</label>
            <input type="search" placeholder="search" @input=${(e: any) => (this.search = e.target.value)} />
          </cds-search>
          <cds-grid aria-label="column multi filter datagrid demo" style="--body-height: 360px">
            <cds-grid-column>Host</cds-grid-column>
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
        </section>`;
    }

    updated(props: PropertyValues) {
      super.updated(props);
      if (props.has('search') && props.get('search') !== this.search) {
        this.filteredList = [...this.data].filter(i =>
          Object.keys(i)
            .map(k => (i as any)[k])
            .reduce((p, n) => `${p} ${n}`)
            .toLocaleLowerCase()
            .includes(this.search.trim().toLocaleLowerCase())
        );
      }
    }

    protected createRenderRoot() {
      return this;
    }
  }
  return html`<demo-grid-column-multi-filter></demo-grid-column-multi-filter>`;
}