import { html } from 'lit';
import { getVMData } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function darkTheme() {
  return html`
  <cds-grid cds-theme="dark" aria-label="dark theme datagrid demo" height="360">
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
  </cds-grid>`;
}
