import { html } from 'lit';
import { getVMData } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function columnResize() {
  return html`
  <cds-grid aria-label="column resize datagrid demo" style="--body-height: 360px">
    <cds-grid-column resizable>Host</cds-grid-column>
    <cds-grid-column resizable>Status</cds-grid-column>
    <cds-grid-column resizable>CPU</cds-grid-column>
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

export function columnFlexWidth() {
  return html`
  <cds-grid aria-label="column flex width datagrid demo" column-layout="flex" style="--body-height: 360px">
    <cds-grid-column resizable>Host</cds-grid-column>
    <cds-grid-column resizable>Status</cds-grid-column>
    <cds-grid-column resizable>CPU</cds-grid-column>
    <cds-grid-column resizable>Memory</cds-grid-column>
    ${getVMData().map(entry => html`
    <cds-grid-row>
      <cds-grid-cell>${entry.id}</cds-grid-cell>
      <cds-grid-cell>${entry.status}</cds-grid-cell>
      <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
      <cds-grid-cell>${entry.memory}%</cds-grid-cell>
    </cds-grid-row>`)}
  </cds-grid>`;
}

export function columnFixedWidth() {
  return html`
  <cds-grid aria-label="column fixed width datagrid demo" style="--body-height: 360px">
    <cds-grid-column width="150px">Host</cds-grid-column>
    <cds-grid-column width="150px">Status</cds-grid-column>
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
