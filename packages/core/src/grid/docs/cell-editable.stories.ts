import { html, LitElement } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { getVMData, TestVM } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function cellEditable() {
  @customElement('demo-grid-cell-editable') // @ts-ignore
  class DemoCellEditable extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="cell editable datagrid demo" height="360">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell aria-readonly="true">${entry.id}</cds-grid-cell>
            <cds-grid-cell @keyup=${(e: any) => this.toggleEdit(e, entry)} @dblclick=${(e: any) => this.toggleEdit(e, entry)}>
              <cds-input>
                <input ?readonly=${!entry.selected} class="${entry.id}-input" type="text" .value=${entry.about} aria-label="${entry.id} about cell" @change=${(e: any) => entry.about = e.target.value} />
              </cds-input>
            </cds-grid-cell>
            <cds-grid-cell aria-readonly="true">${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell aria-readonly="true">${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }

    private toggleEdit(e: any, entry: TestVM) {
      if (!entry.selected && (e.code === 'Enter' || e.type === 'dblclick')) {
        entry.selected = true;
        this.data = [...this.data];
        e.target.querySelector('input')?.focus();
      } else if (entry.selected && (e.code === 'Enter' || e.code === 'Escape' || e.type === 'blur')) {
        entry.selected = false;
        this.data = [...this.data];
        e.target.closest('cds-grid-cell').focus();
      }
    }
  }
  return html`<demo-grid-cell-editable></demo-grid-cell-editable>`;
}