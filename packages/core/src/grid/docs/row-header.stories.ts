import { html } from 'lit';
import { getVMData } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function rowHeader() {
  return html`
  <cds-grid  aria-label="row header datagrid demo" height="360">
    <cds-grid-column width="120">Host</cds-grid-column>
    <cds-grid-column>Status</cds-grid-column>
    <cds-grid-column>CPU</cds-grid-column>
    <cds-grid-column>Memory</cds-grid-column>
    ${getVMData().map(entry => html`
    <cds-grid-row>
      <cds-grid-cell role="rowheader">${entry.id}</cds-grid-cell>
      <cds-grid-cell>${entry.status}</cds-grid-cell>
      <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
      <cds-grid-cell>${entry.memory}%</cds-grid-cell>
    </cds-grid-row>`)}
    <cds-grid-footer></cds-grid-footer>
  </cds-grid>`;
}