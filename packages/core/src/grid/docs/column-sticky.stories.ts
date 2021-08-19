import { html } from 'lit';
import { getVMData } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function columnSticky() {
  return html`
  <cds-grid aria-label="column sticky datagrid demo" style="--body-height: 360px">
    <cds-grid-column width="200px">Host</cds-grid-column>
    <cds-grid-column width="200px" position="sticky">Status</cds-grid-column>
    <cds-grid-column width="1000px">CPU</cds-grid-column>
    <cds-grid-column width="1000px">Memory</cds-grid-column>
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