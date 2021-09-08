import { html, LitElement } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { getVMData } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function rowBatchAction() {
  @customElement('demo-grid-row-batch-action')
  class DemoRowBatchAction extends LitElement {
    @state() private data = getVMData();
    @state() private batchActionAnchor: HTMLElement;

    get selected() {
      return this.data.filter(i => i.selected).length;
    }

    render() {
      return html`
        <cds-grid aria-label="row batch action datagrid demo" height="360">
          <cds-grid-column type="action">
            <cds-checkbox>
              <input type="checkbox" .checked=${this.selected === this.data.length} .indeterminate=${(this.selected > 0) && (this.selected < this.data.length)} @change=${(e: any) => this.selectAll(e)} aria-label="select all hosts" />
            </cds-checkbox>
          </cds-grid-column>
          <cds-grid-column>
            Host <cds-action popup="row-actions" @click=${(e: any) => this.batchActionAnchor = e.target} aria-label="available host options"></cds-action>
          </cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row .selected=${entry.selected}>
            <cds-grid-cell>
              <cds-checkbox>
                <input type="checkbox" .checked=${entry.selected} value=${entry.id} @click=${(e: any) => this.select(entry, e.target.checked)} aria-label="select host ${entry.id}" />
              </cds-checkbox>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        <cds-dropdown id="row-actions" ?hidden=${!this.batchActionAnchor} .anchor=${this.batchActionAnchor} @closeChange=${() => (this.batchActionAnchor = null as any)} position="bottom">
          <cds-button action="flat" size="sm" @click=${() => this.action('Restart')}>Restart Selected</cds-button>
          <cds-button action="flat" size="sm" @click=${() => this.action('Shutdown')}>Shutdown Selected</cds-button>
        </cds-dropdown>`;
    }

    private select(entry: any, checked: boolean) {
      this.data.find(i => i.id === entry.id).selected = checked;
      this.data = [...this.data];
    }

    private selectAll(e: any) {
      this.data.forEach(i => (i.selected = e.target.checked));
      this.data = [...this.data];
    }

    private action(name: string) {
      alert(`${name}: ${this.data.filter(i => i.selected).map(i => i.id).reduce((p, n) => `${p} ${n}`, '')}`);
      this.batchActionAnchor = null;
      this.data.forEach(i => (i.selected = false));
    }
  }
  return html`<demo-grid-row-batch-action></demo-grid-row-batch-action>`;
}