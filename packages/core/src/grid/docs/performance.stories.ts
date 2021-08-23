import { html, LitElement } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { getVMData, TestVM } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function performance() {
  @customElement('demo-grid-performance') // @ts-ignore
  class DemoPerformance extends LitElement {
    @state() private showParseAndRender = false;
    @state() private hide = false;
    @state() private data: TestVM[] = [];
    @state() private numberOfRows = 1000;

    render() {
      return html`
        <section cds-layout="vertical gap:lg">
          <cds-input control-width="shrink">
            <label>Number of Rows</label>
            <input type="number" min="20" .value=${`${this.numberOfRows}`} @input=${(e: any) => this.setRows(parseInt(e.target.value))} />
          </cds-input>
          <br />
          <button @click=${this.toggleGrid}>Render Large Grid</button>
          <button @click=${this.toggleVisibility}>css visibility</button>
          <br /><br />
          ${this.showParseAndRender ? html`
          <cds-grid aria-label="performance datagrid demo" ?hidden=${this.hide} height="360" style="width: 800px">
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
            <cds-grid-footer>
              <p style="margin: 0; line-height: 0">${this.data.length} Rows ${this.data.length * 4} Cells</p>
            </cds-grid-footer>
          </cds-grid>` : ''}
        </section>`;
    }

    connectedCallback() {
      super.connectedCallback();
      this.setRows(1000);
    }

    private toggleGrid() {
      this.showParseAndRender = !this.showParseAndRender;
      this.hide = !this.showParseAndRender;
    }

    private toggleVisibility() {
      if (this.showParseAndRender) {
        this.hide = !this.hide;
      }
    }

    private setRows(numberOfRows: number) {
      this.showParseAndRender = false;
      this.numberOfRows = numberOfRows;
      const data: any[] = [];

      for (let i = 0; i < (this.numberOfRows / 20); i++) {
        data.push(
          ...getVMData().map(e => {
            e.id = `${e.id}${i === 0 ? '' : `-${i}`}`;
            return e;
          })
        );
      }

      this.data = data;
    }
  }
  return html`<demo-grid-performance></demo-grid-performance>`;
}