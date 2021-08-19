import { html, LitElement } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { getVMData, TestVM } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function rowDetail() {
  @customElement('demo-grid-row-detail') // @ts-ignore
  class DemoRowDetail extends LitElement {
    @state() private data = getVMData();
    @state() private currentVM: TestVM;
    @state() private anchor: HTMLElement;

    render() {
      return html`
        <cds-grid aria-label="row detail datagrid demo" style="--body-height: 360px">
          <cds-grid-column type="action" aria-label="row detail column"></cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>
              <cds-action-expand popup="row-detail" action="detail" aria-label="view host ${entry.id} details" .expanded=${this.currentVM?.id === entry.id} @click=${(e: any) => this.showDetail(e, entry)}></cds-action-expand>
            </cds-grid-cell>
            <cds-grid-cell role="rowheader">${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
          <cds-grid-detail mobile id="row-detail" ?hidden=${!this.currentVM} .anchor=${this.anchor} @closeChange=${() => (this.currentVM = null) as any}>
            <h2 cds-text="section">${this.currentVM?.id}</h2>
            <p cds-text="body">Status: ${this.currentVM?.status}</p>
            <p cds-text="body">CPU: ${this.currentVM?.cpu}%</p>
            <p cds-text="body">Memory: ${this.currentVM?.memory}%</p>
          </cds-grid-detail>
        </cds-grid>`;
    }

    private showDetail(event: any, vm: TestVM) {
      if (this.currentVM?.id !== vm.id) {
        this.currentVM = vm;
        this.anchor = event.target;
      } else {
        this.currentVM = null;
      }
    }
  }
  return html`<demo-grid-row-detail></demo-grid-row-detail>`;
}