import { html, LitElement } from 'lit';
import pipe from 'ramda/es/pipe.js';
import { customElement, state } from '@cds/core/internal';
import { getVMData, sortStrings, TestVM } from '@cds/core/demo';
import { ActionSort } from '@cds/core/actions';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function rowMultiSort() {
  @customElement('demo-grid-row-multi-sort') // @ts-ignore
  class DemoRowMultiSort extends LitElement {
    @state() private idSort: ActionSort = 'none';
    @state() private statusSort: ActionSort = 'none';

    get items() {
      return pipe(
        (list: TestVM[]) => sortStrings(list, 'id', this.idSort),
        (list: TestVM[]) => sortStrings(list, 'status', this.statusSort)
      )(getVMData());
    }

    render() {
      return html`
        <cds-grid aria-label="row multi sort datagrid demo" height="360">
          <cds-grid-column>
            Host <cds-action-sort aria-label="sort host" .sort=${this.idSort} @sortChange=${(e: any) => this.idSort = e.detail}></cds-action-sort>
          </cds-grid-column>
          <cds-grid-column>
            Status <cds-action-sort aria-label="sort status" .sort=${this.statusSort} @sortChange=${(e: any) => this.statusSort = e.detail}></cds-action-sort>
          </cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.items.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
      `;
    }
  }
  return html`<demo-grid-row-multi-sort></demo-grid-row-multi-sort>`;
}