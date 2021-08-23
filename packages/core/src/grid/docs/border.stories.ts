import { html } from 'lit';
import { getVMData } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function borderCell() {
  return html`
  <cds-grid aria-label="border cell datagrid demo" border="cell" height="360">
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

export function borderColumn() {
  return html`
  <cds-grid aria-label="border column datagrid demo" border="column" height="360">
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

export function borderNone() {
  return html`
  <cds-grid aria-label="border none datagrid demo" border="none" height="360">
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

export function borderStripe() {
  return html`
  <cds-grid aria-label="border stripe datagrid demo" border="stripe" height="360">
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