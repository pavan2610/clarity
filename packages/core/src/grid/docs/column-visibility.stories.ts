import { html, LitElement } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { ColumnTypes, getVMData } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function columnVisibility() {
  @customElement('demo-grid-column-visibility') // @ts-ignore
  class DemoColumnVisibility extends LitElement {
    @state() private data = getVMData();
    @state() private selectedColumns = 7;
    @state() private columnAnchor: HTMLElement;

    render() {
      return html`
        <cds-grid aria-label="column visibility datagrid demo" height="360">
          <cds-grid-column>Host</cds-grid-column>
          ${this.checked(ColumnTypes.Status) ? html`<cds-grid-column>Status</cds-grid-column>` : ''}
          ${this.checked(ColumnTypes.CPU) ? html`<cds-grid-column>CPU</cds-grid-column>` : ''}
          <cds-grid-column ?hidden=${!this.checked(ColumnTypes.Memory)}>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            ${this.checked(ColumnTypes.Status) ? html`<cds-grid-cell>${entry.status}</cds-grid-cell>` : ''}
            ${this.checked(ColumnTypes.CPU) ? html`<cds-grid-cell>${entry.cpu}%</cds-grid-cell>` : ''}
            <cds-grid-cell ?hidden=${!this.checked(ColumnTypes.Memory)}>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer>
            <cds-action popup="column-visbility" @click=${(e: any) => (this.columnAnchor = e.target)} aria-label="filter column" shape="view-columns" .status=${!this.checked(ColumnTypes.All) ? 'active' : ''}></cds-action>
          </cds-grid-footer>
        </cds-grid>
        <cds-dropdown id="column-visbility" ?hidden=${!this.columnAnchor} @closeChange=${(): void => this.columnAnchor = null} .anchor=${this.columnAnchor} position="top">
          <cds-checkbox-group layout="vertical">
            <cds-checkbox>
              <label>Status</label>
              <input type="checkbox" value=${ColumnTypes.Status} @click=${this.selectColumns} .checked=${this.checked(ColumnTypes.Status)} />
            </cds-checkbox>
            <cds-checkbox>
              <label>CPU</label>
              <input type="checkbox" value=${ColumnTypes.CPU} @click=${this.selectColumns} .checked=${this.checked(ColumnTypes.CPU)} />
            </cds-checkbox>
            <cds-checkbox>
              <label>Memory</label>
              <input type="checkbox" value=${ColumnTypes.Memory} @click=${this.selectColumns} .checked=${this.checked(ColumnTypes.Memory)} />
            </cds-checkbox>
          </cds-checkbox-group>
          <cds-button action="flat" @click=${this.selectAll} ?disabled=${this.checked(ColumnTypes.All)}>
            Select All
          </cds-button>
        </cds-dropdown>`;
    }

    private selectColumns() {
      this.selectedColumns = Array.from(this.shadowRoot.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'))
        .filter(c => c.checked)
        .map(c => parseInt(c.value))
        .reduce((p, n) => p + n, 1);
    }

    private selectAll() {
      this.selectedColumns = ColumnTypes.All;
    }

    private checked(value: ColumnTypes) {
      return value === (this.selectedColumns & value);
    }
  }
  return html`<demo-grid-column-visibility></demo-grid-column-visibility>`;
}