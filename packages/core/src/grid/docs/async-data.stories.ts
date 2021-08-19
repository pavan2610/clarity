import { html, LitElement, PropertyValues } from 'lit';
import { state, customElement } from '@cds/core/internal';
import { getVMDataAsync, TestVM } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function asyncData() {
  @customElement('demo-grid-async-data') // @ts-ignore
  class DemoGridAsyncData extends LitElement {
    @state() private data: TestVM[] = [];

    render() {
      return html`
        <cds-grid aria-label="async loading datagrid demo" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          ${this.data.length === 0 ? html`
          <cds-grid-placeholder>
            <cds-progress-circle size="xl" status="info"></cds-progress-circle>
            <p cds-text="subsection">Loading VMs</p>
          </cds-grid-placeholder>` : ''}
          <cds-grid-footer>
            <cds-inline-button @click=${() => this.load()}>Reload Data</cds-inline-button>
          </cds-grid-footer>
        </cds-grid>`;
    }

    firstUpdated(props: PropertyValues) {
      super.firstUpdated(props);
      this.load();
    }

    private async load() {
      this.data = [];
      this.data = await getVMDataAsync(2000);
    }
  }

  return html`<demo-grid-async-data></demo-grid-async-data>`;
}