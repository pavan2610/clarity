import { html, LitElement } from 'lit';
import { baseStyles, CdsPerformance, customElement, state } from '@cds/core/internal';
import { getVMData, TestVM } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function performance() {
  @customElement('demo-grid-performance')
  class DemoPerformance extends LitElement {
    @state() private showParseAndRender = false;
    @state() private hide = false;
    @state() private data: TestVM[] = [];
    @state() private numberOfRows = 1000;
    @state() private timing: CdsPerformance;

    static styles = [baseStyles];

    render() {
      return html`
        <div style="opacity: 0">
          <!-- preload fonts to prevent re-render calcs -->
          <span style="font-weight: var(--cds-global-typography-font-weight-light)">i</span>
          <span style="font-weight: var(--cds-global-typography-font-weight-regular)">i</span>
          <span style="font-weight: var(--cds-global-typography-font-weight-medium)">i</span>
          <span style="font-weight: var(--cds-global-typography-font-weight-semibold)">i</span>
          <span style="font-weight: var(--cds-global-typography-font-weight-bold)">i</span>
          <span style="font-weight: var(--cds-global-typography-font-weight-extrabold)">i</span>
        </div>
        <section>
          <cds-input control-width="shrink">
            <label>Number of Rows</label>
            <input type="number" min="20" .value=${`${this.numberOfRows}`} @input=${(e: any) => this.setRows(parseInt(e.target.value))} />
          </cds-input>

          <br />
          
          <!-- not cds-button to prevent click event side effects with render time -->
          <button @click=${this.toggleGrid}>Render Large Grid</button>
          <button @click=${this.toggleVisibility}>css visibility</button>

          <br /><br />
          <p cds-text="body">
            Render Time: ${this.timing ? html`~${this.timing.entry.duration.toFixed(2)}ms ${this.timing.score}` : ''}
          </p>
          <br />

          <div style="width: 800px; height: 398px;">
            ${this.showParseAndRender ? html`
            <cds-grid cds-performance @cdsPerformanceChange=${(e: any) => this.timing = e.detail} aria-label="performance datagrid demo" ?hidden=${this.hide} height="360" style="width: 800px; height: 398px;">
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
          </div>
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
      this.timing = null;
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