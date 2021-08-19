import { html, LitElement } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { getVMData } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function columnFixed() {
  return html`
  <cds-grid aria-label="column fixed datagrid demo" style="--body-height: 360px">
    <cds-grid-column width="150px" position="fixed">Host</cds-grid-column>
    <cds-grid-column width="350px">Status</cds-grid-column>
    <cds-grid-column width="500px">CPU</cds-grid-column>
    <cds-grid-column width="150px" position="fixed">Memory</cds-grid-column>
    ${getVMData().map(entry => html`
    <cds-grid-row>
      <cds-grid-cell>${entry.id}</cds-grid-cell>
      <cds-grid-cell>${entry.status}</cds-grid-cell>
      <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
      <cds-grid-cell>${entry.memory}%</cds-grid-cell>
    </cds-grid-row>`)}
    <cds-grid-footer></cds-grid-footer>
  </cds-grid>`;
}

export function columnFixedDynamic() {
  @customElement('demo-column-fixed-dynamic') // @ts-ignore
  class DemoColumnFixedDyanmic extends LitElement {
    @state() private data = getVMData();
    @state() private pinFirst = true;
    @state() private pinLast = true;

    render() {
      return html`
        <cds-grid aria-label="columns fixed dynamic datagrid demo" style="--body-height: 360px">
          <cds-grid-column width="200px" resizable .position=${this.pinFirst ? 'fixed' : ''}>
            Host <cds-action @click=${() => (this.pinFirst = !this.pinFirst)} .status=${this.pinFirst ? 'active' : ''} shape="pin" aria-label="pin host column"></cds-action>
          </cds-grid-column>
          <cds-grid-column width="400px" resizable>Status</cds-grid-column>
          <cds-grid-column width="1000px" resizable>CPU</cds-grid-column>
          <cds-grid-column width="200px" resizable .position=${this.pinLast ? 'fixed' : ''}>
            Memory <cds-action @click=${() => (this.pinLast = !this.pinLast)} .status=${this.pinLast ? 'active' : ''} shape="pin" aria-label="pin memory column"></cds-action>
          </cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }
  }
  return html`<demo-column-fixed-dynamic></demo-column-fixed-dynamic>`;
}

export function columnMultiFixed() {
  return html`
  <cds-grid aria-label="column multi fixed datagrid demo" style="--body-height: 360px">
    <cds-grid-column width="150px" position="fixed">Host</cds-grid-column>
    <cds-grid-column width="150px" position="fixed">Status</cds-grid-column>
    <cds-grid-column width="500px">CPU</cds-grid-column>
    <cds-grid-column width="500px">Memory</cds-grid-column>
    ${getVMData().map(entry => html`
    <cds-grid-row>
      <cds-grid-cell>${entry.id}</cds-grid-cell>
      <cds-grid-cell>${entry.status}</cds-grid-cell>
      <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
      <cds-grid-cell>${entry.memory}%</cds-grid-cell>
    </cds-grid-row>`)}
    <cds-grid-footer></cds-grid-footer>
  </cds-grid>`;
}
