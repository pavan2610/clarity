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
        <cds-grid aria-label="row detail datagrid demo" height="360">
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
          <cds-grid-detail id="row-detail" ?hidden=${!this.currentVM} .anchor=${this.anchor} @closeChange=${() => (this.currentVM = null) as any}>
            <cds-button>light dom one</cds-button>
            <h2 cds-text="section">${this.currentVM?.id}</h2>
            <p cds-text="body">Status: ${this.currentVM?.status}</p>
            <p cds-text="body">CPU: ${this.currentVM?.cpu}%</p>
            <p cds-text="body">Memory: ${this.currentVM?.memory}%</p>
            <cds-button cds-focus-first>light dom two</cds-button>
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

export function staticRowDetail() {
  return html`
    <cds-grid aria-label="static row detail datagrid demo" height="360">
      <cds-grid-column type="action" aria-label="row detail column"></cds-grid-column>
      <cds-grid-column>Host</cds-grid-column>
      <cds-grid-column>Status</cds-grid-column>
      <cds-grid-column>CPU</cds-grid-column>
      <cds-grid-column>Memory</cds-grid-column>
      <cds-grid-row>
        <cds-grid-cell>
          <cds-action-expand id="expand-vm-host-001" popup="row-detail" action="detail" aria-label="vm-host-001 details"></cds-action-expand>
        </cds-grid-cell>
        <cds-grid-cell>vm-host-001</cds-grid-cell>
        <cds-grid-cell>online</cds-grid-cell>
        <cds-grid-cell>5%</cds-grid-cell>
        <cds-grid-cell>10%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>
          <cds-action-expand expanded id="expand-vm-host-003" popup="row-detail" action="detail" aria-label="vm-host-003 details"></cds-action-expand>
        </cds-grid-cell>
        <cds-grid-cell>vm-host-003</cds-grid-cell>
        <cds-grid-cell>online</cds-grid-cell>
        <cds-grid-cell>10%</cds-grid-cell>
        <cds-grid-cell>30%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>
          <cds-action-expand id="expand-vm-host-002" popup="row-detail" action="detail" aria-label="vm-host-002 details"></cds-action-expand>
        </cds-grid-cell>
        <cds-grid-cell>vm-host-002</cds-grid-cell>
        <cds-grid-cell>online</cds-grid-cell>
        <cds-grid-cell>20%</cds-grid-cell>
        <cds-grid-cell>30%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-footer></cds-grid-footer>
      <cds-grid-detail id="row-detail" anchor="expand-vm-host-003">
        <div cds-layout="vertical gap:lg">
          <button>test</button>  
          <h2 cds-text="section">vm-host-001</h2>
          <p cds-text="body">Status: online</p>
          <p cds-text="body">CPU: 5%</p>
          <p cds-text="body">Memory: 10%</p>
          <button cds-focus-first>test</button>
        </div>
      </cds-grid-detail>
    </cds-grid>

    <button>test</button>
  `;
}