import { html, LitElement } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { getVMData, TestVM } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function rowAction() {
  @customElement('demo-grid-row-action') // @ts-ignore
  class DemoRowAction extends LitElement {
    @state() private data = getVMData();
    @state() private selectedEntry: any = null;
    @state() private anchor: HTMLElement = null;

    render() {
      return html`
        <cds-grid aria-label="row action datagrid demo" height="360">
          <cds-grid-column type="action" aria-label="selection column"></cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>
              <cds-action popup="row-actions" aria-label="${entry.id} actions" @click=${(e: any) => this.select(e, entry)}></cds-action>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        <cds-dropdown id="row-actions" ?hidden=${!this.selectedEntry} .anchor=${this.anchor} @closeChange=${() => (this.selectedEntry = null) as any}>
          <cds-button action="flat" size="sm" @click=${() => this.shutdown(this.selectedEntry)}>Shutdown ${this.selectedEntry?.id}</cds-button>
          <cds-button action="flat" size="sm" @click=${() => this.restart(this.selectedEntry)}>Restart ${this.selectedEntry?.id}</cds-button>
        </cds-dropdown>`;
    }

    private select(e: any, entry: TestVM) {
      this.selectedEntry = entry;
      this.anchor = e.target;
    }

    private shutdown(entry: any) {
      alert(`Shutdown: ${entry.id}`);
      this.selectedEntry = null;
    }

    private restart(entry: any) {
      alert(`Restarted: ${entry.id}`);
      this.selectedEntry = null;
    }
  }
  return html`<demo-grid-row-action></demo-grid-row-action>`;
}