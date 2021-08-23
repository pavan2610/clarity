import { html } from 'lit';
import { getVMData } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function columnAlignCenter() {
  return html`
  <cds-grid column-align="center" aria-label="column align center datagrid demo" height="360">
    <cds-grid-column>Host</cds-grid-column>
    <cds-grid-column>Status</cds-grid-column>
    <cds-grid-column>CPU</cds-grid-column>
    <cds-grid-column>Memory</cds-grid-column>
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

export function columnAlignRight() {
  return html`
  <cds-grid column-align="right" aria-label="column align right datagrid demo" height="360">
    <cds-grid-column>Host</cds-grid-column>
    <cds-grid-column>Status</cds-grid-column>
    <cds-grid-column>CPU</cds-grid-column>
    <cds-grid-column>Memory</cds-grid-column>
    ${getVMData().map(entry => html`
    <cds-grid-row>
      <cds-grid-cell>${entry.id}</cds-grid-cell>
      <cds-grid-cell>${entry.status}</cds-grid-cell>
      <cds-grid-cell><p cds-text="monospace">${entry.cpu.toFixed(2)}%</p></cds-grid-cell>
      <cds-grid-cell><p cds-text="monospace">${entry.memory.toFixed(2)}%</p></cds-grid-cell>
    </cds-grid-row>`)}
    <cds-grid-footer></cds-grid-footer>
  </cds-grid>`;
}