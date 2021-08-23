import { html } from 'lit';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function placeholder() {
  return html`
    <cds-grid aria-label="placeholder datagrid demo" height="360">
      <cds-grid-column>Host</cds-grid-column>
      <cds-grid-column>Status</cds-grid-column>
      <cds-grid-column>CPU</cds-grid-column>
      <cds-grid-column>Memory</cds-grid-column>
      <cds-grid-placeholder>
        <cds-icon shape="filter" size="xl"></cds-icon>
        <p cds-text="subsection">No VMs were found.</p>
      </cds-grid-placeholder>
      <cds-grid-footer></cds-grid-footer>
    </cds-grid>
  `;
}