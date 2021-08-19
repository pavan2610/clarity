import { html } from 'lit';
import { getVMData } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function columnOverflow() {
  const data = getVMData();
  data[0].cpu = 25.00000001;
  data[0].memory = 50.00000001;

  return html`
  <cds-grid aria-label="column overflow datagrid demo" style="--body-height: 360px">
    <cds-grid-column>Host</cds-grid-column>
    <cds-grid-column>Status</cds-grid-column>
    <cds-grid-column width="100px">CPU</cds-grid-column>
    <cds-grid-column width="100px">Memory</cds-grid-column>
    ${data.map(entry => html`
    <cds-grid-row>
      <cds-grid-cell>${entry.id}</cds-grid-cell>
      <cds-grid-cell>${entry.status}</cds-grid-cell>
      <cds-grid-cell><p cds-text="truncate">${entry.cpu}%</p></cds-grid-cell>
      <cds-grid-cell><p cds-text="truncate">${entry.memory}%</p></cds-grid-cell>
    </cds-grid-row>`)}
  </cds-grid>`;
}