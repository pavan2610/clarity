import { html } from 'lit';
import { getVMData } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function responsive() {
  return html`
  <cds-grid aria-label="responsive datagrid demo" height="480" style="width: 320px">
    <cds-grid-column position="fixed" width="120">Host</cds-grid-column>
    <cds-grid-column width="200">Status</cds-grid-column>
    <cds-grid-column width="200">CPU</cds-grid-column>
    <cds-grid-column width="200">Memory</cds-grid-column>
    ${getVMData().map(entry => html`
    <cds-grid-row>
      <cds-grid-cell role="rowheader">${entry.id}</cds-grid-cell>
      <cds-grid-cell>${entry.status}</cds-grid-cell>
      <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
      <cds-grid-cell>${entry.memory}%</cds-grid-cell>
    </cds-grid-row>`)}
  </cds-grid>`;
}