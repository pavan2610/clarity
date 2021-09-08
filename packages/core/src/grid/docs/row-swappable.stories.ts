import { html, LitElement } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { getVMData, swapBetweenLists, swapItems, TestVM } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function rowSwappable() {
  @customElement('demo-grid-row-swappable')
  class DemoRowSwappable extends LitElement {
    @state() private listOne = getVMData().slice(0, 3);
    @state() private listTwo = getVMData().slice(4, 7);
    @state() private selectedEntryId: string;
    @state() private ariaLiveMessage = '';
    @state() private dropdownAnchor: HTMLElement;

    render() {
      return html`
        <cds-grid aria-label="production VMs" @cdsDraggableChange=${this.sortOne} height="360">
          <cds-grid-column type="action" aria-label="draggable handle"></cds-grid-column>
          <cds-grid-column type="action" aria-label="draggable action"></cds-grid-column>
          <cds-grid-column>Production Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          ${this.listOne.map(entry => html`
          <cds-grid-row id=${entry.id} draggable="true">
            <cds-grid-cell>
              <cds-action-handle aria-label="sort ${entry.id}"></cds-action-handle>
            </cds-grid-cell>
            <cds-grid-cell>
              <cds-action popup="migrate-dropdown" aria-label="${entry.id} actions" @click=${(e: any) => this.selectEntry(entry, e.target)}></cds-action>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-placeholder draggable="false">Production Environment</cds-grid-placeholder>
          <cds-grid-footer>List One: ${this.listOne.map(i => html`${i.id} `)}</cds-grid-footer>
        </cds-grid>

        <br />
        <p>aria-live:</p>
        <div aria-live="assertive" role="log" aria-atomic="true">${this.ariaLiveMessage}</div>

        <cds-grid aria-label="staging VMs" @cdsDraggableChange=${this.sortTwo} height="360">
          <cds-grid-column type="action" aria-label="draggable handle"></cds-grid-column>
          <cds-grid-column type="action" aria-label="draggable action"></cds-grid-column>
          <cds-grid-column>Staging Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          ${this.listTwo.map(entry => html`
          <cds-grid-row id=${entry.id} draggable="true">
            <cds-grid-cell>
              <cds-action-handle aria-label="sort ${entry.id}"></cds-action-handle>
            </cds-grid-cell>
            <cds-grid-cell>
              <cds-action popup="migrate-dropdown" aria-label="${entry.id} actions" @click=${(e: any) => this.selectEntry(entry, e.target)}></cds-action>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-placeholder draggable="false">Staging Environment</cds-grid-placeholder>
          <cds-grid-footer>List Two: ${this.listTwo.map(j => html`${j.id} `)}</cds-grid-footer>
        </cds-grid>
        <cds-dropdown id="migrate-dropdown" ?hidden=${!this.selectedEntryId} .anchor=${this.dropdownAnchor} @closeChange=${() => (this.dropdownAnchor = null) as any}>
          <cds-button @click=${this.appendToOtherGrid} action="flat" size="sm">Move to <span>${this.listOne.find(i => i.id === this.selectedEntryId) ? 'Staging' : 'Production'}</span></cds-button>
        </cds-dropdown>
      `;
    }

    private selectEntry(entry: TestVM, anchor: HTMLElement) {
      this.dropdownAnchor = anchor;
      this.selectedEntryId = entry.id;
    }

    private appendToOtherGrid() {
      let item = this.listOne.find(i => i.id === this.selectedEntryId);

      if (item) {
        this.listOne.splice(this.listOne.indexOf(item), 1);
        this.listTwo.push(item);
      } else {
        item = this.listTwo.find(i => i.id === this.selectedEntryId);
        this.listTwo.splice(this.listTwo.indexOf(item), 1);
        this.listOne.push(item);
      }

      this.listOne = [...this.listOne];
      this.listTwo = [...this.listTwo];
      this.selectedEntryId = null;
    }

    private sortOne(e: any) {
      this.setAriaLiveMessage(e);
      if (e.detail.type === 'reordered') {
        if (this.listOne.find(i => i.id === e.detail.from.id)) {
          this.listOne = swapItems(e.detail.target, e.detail.from, this.listOne) as TestVM[];
        } else {
          const { fromList, targetList } = swapBetweenLists<TestVM>(this.listOne, this.listTwo, e.detail);
          this.listOne = targetList;
          this.listTwo = fromList;
        }
      }
    }

    private sortTwo(e: any) {
      this.setAriaLiveMessage(e);
      if (e.detail.type === 'reordered') {
        if (this.listTwo.find(i => i.id === e.detail.from.id)) {
          this.listTwo = swapItems(e.detail.target, e.detail.from, this.listTwo) as TestVM[];
        } else {
          const { fromList, targetList } = swapBetweenLists<TestVM>(this.listTwo, this.listOne, e.detail);
          this.listTwo = targetList;
          this.listOne = fromList;
        }
      }
    }

    private setAriaLiveMessage(e: any) {
      if (e.detail.type === 'reordered') {
        const listOneIndex = this.listOne.findIndex(i => i.id === e.detail.target.id);
        const listTwoIndex = this.listTwo.findIndex(i => i.id === e.detail.target.id);
        this.ariaLiveMessage = `host ${e.detail.from.id} moved to row ${(listOneIndex !== -1 ? listOneIndex : listTwoIndex) + 1} ${listOneIndex !== -1 ? 'production' : 'staging'}`;
      } else {
        this.ariaLiveMessage = `host ${e.detail.from.id} ${e.detail.type}`;
      }
    }
  }
  return html`<demo-grid-row-swappable></demo-grid-row-swappable>`;
}