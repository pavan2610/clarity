/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement, PropertyValues } from 'lit';
import { query } from 'lit/decorators/query.js';
import pipe from 'ramda/es/pipe.js';
import { registerElementSafely, state } from '@cds/core/internal';
import { paginate, filter, sortStrings, swapItems, getVMData, TestVM, StatusDisplayType, StatusIconType, groupArray, swapBetweenLists, getVMDataAsync } from '@cds/core/demo';
import '@cds/core/pagination/register.js';
import '@cds/core/datalist/register.js';
import '@cds/core/checkbox/register.js';
import '@cds/core/search/register.js';
import '@cds/core/select/register.js';
import '@cds/core/radio/register.js';
import '@cds/core/grid/register.js';
import { CdsGridCell } from '@cds/core/grid';
import { ClarityIcons } from '@cds/core/icon/icon.service.js';
import { checkCircleIcon } from '@cds/core/icon/shapes/check-circle.js';
import { filterIcon } from '@cds/core/icon/shapes/filter.js';
import { exclamationTriangleIcon } from '@cds/core/icon/shapes/exclamation-triangle.js';
import { exclamationCircleIcon } from '@cds/core/icon/shapes/exclamation-circle.js';
import { disconnectIcon } from '@cds/core/icon/shapes/disconnect.js';
import { viewColumnsIcon } from '@cds/core/icon/shapes/view-columns.js';

ClarityIcons.addIcons(checkCircleIcon, exclamationTriangleIcon, exclamationCircleIcon, disconnectIcon, filterIcon, viewColumnsIcon);

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function all() {
  return html`
    <style>
      .grid-all-demo > div > *:nth-child(2) {
        width: 100%;
      }
    </style>
    <section class="grid-all-demo" cds-layout="grid cols@lg:6 cols@xl:4 gap:lg">
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Basic</h2>
        ${basic()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Keyboard</h2>
        ${keyboard()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Column Resize</h2>
        ${columnResize()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Column Flex Width</h2>
        ${columnFlexWidth()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Column Overflow</h2>
        ${columnOverflow()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Column Fixed Width</h2>
        ${columnFixedWidth()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Placeholder</h2>
        ${placeholder()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Pagination</h2>
        ${pagination()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Column Visibility</h2>
        ${columnVisibility()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Row Detail</h2>
        ${rowDetail()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Row Single Select</h2>
        ${rowSingleSelect()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Row Multi Select</h2>
        ${rowMultiSelect()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Range Select</h2>
        ${rangeSelect()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Range Select Context Menu</h2>
        ${rangeSelectContextMenu()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Row Action</h2>
        ${rowAction()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Row Batch Action</h2>
        ${rowBatchAction()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Row Sort</h2>
        ${rowSort()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Row Multi Sort</h2>
        ${rowMultiSort()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Column Filter</h2>
        ${columnFilter()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Column Multi Filter</h2>
        ${columnMultiFilter()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Async Data</h2>
        ${asyncData()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Column Fixed</h2>
        ${columnFixed()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Column Fixed Dynamic</h2>
        ${columnFixedDynamic()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Column Multi Fixed</h2>
        ${columnMultiFixed()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Column Sticky</h2>
        ${columnSticky()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Cell Editable</h2>
        ${cellEditable()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">RTL Support</h2>
        ${rtl()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Footer</h2>
        ${footer()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Footer Optional</h2>
        ${footerOptional()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Row Height</h2>
        ${rowHeight()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Compact</h2>
        ${compact()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Row Draggable</h2>
        ${rowDraggable()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Row Swappable</h2>
        ${rowSwappable()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Column Draggable</h2>
        ${columnDraggable()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Row Fixed</h2>
        ${rowFixed()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Row Sticky</h2>
        ${rowSticky()}
      </div>
      <div cds-layout="vertical gap:lg" style="min-height: 650px">
        <h2 cds-text="section">Performance</h2>
        ${performance()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Kitchen Sink</h2>
        ${kitchenSink()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Responsive</h2>
        ${responsive()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Dark Theme</h2>
        ${darkTheme()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Border Cell</h2>
        ${borderCell()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Border Column</h2>
        ${borderColumn()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Border None</h2>
        ${borderNone()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Row Header</h2>
        ${rowHeader()}
      </div>
    </section>
  `;
}

export function basic() {
  return html`
    <cds-grid aria-label="basic datagrid demo" style="--body-height: 360px">
      <!-- <cds-grid-column-group> -->
        <cds-grid-column>Host</cds-grid-column>
        <cds-grid-column>Status</cds-grid-column>
        <cds-grid-column>CPU</cds-grid-column>
        <cds-grid-column>Memory</cds-grid-column>
      <!-- </cds-grid-column-group> -->
      <cds-grid-row>
        <cds-grid-cell>vm-host-001</cds-grid-cell>
        <cds-grid-cell>online</cds-grid-cell>
        <cds-grid-cell>5%</cds-grid-cell>
        <cds-grid-cell>10%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>vm-host-003</cds-grid-cell>
        <cds-grid-cell>online</cds-grid-cell>
        <cds-grid-cell>10%</cds-grid-cell>
        <cds-grid-cell>30%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>vm-host-002</cds-grid-cell>
        <cds-grid-cell>online</cds-grid-cell>
        <cds-grid-cell>20%</cds-grid-cell>
        <cds-grid-cell>30%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>vm-host-011</cds-grid-cell>
        <cds-grid-cell>offline</cds-grid-cell>
        <cds-grid-cell>90%</cds-grid-cell>
        <cds-grid-cell>80%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>vm-host-004</cds-grid-cell>
        <cds-grid-cell>offline</cds-grid-cell>
        <cds-grid-cell>90%</cds-grid-cell>
        <cds-grid-cell>80%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>vm-host-008</cds-grid-cell>
        <cds-grid-cell>disruption</cds-grid-cell>
        <cds-grid-cell>50%</cds-grid-cell>
        <cds-grid-cell>60%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>vm-host-006</cds-grid-cell>
        <cds-grid-cell>deactivated</cds-grid-cell>
        <cds-grid-cell>0%</cds-grid-cell>
        <cds-grid-cell>0%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>vm-host-005</cds-grid-cell>
        <cds-grid-cell>offline</cds-grid-cell>
        <cds-grid-cell>85%</cds-grid-cell>
        <cds-grid-cell>70%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>vm-host-007</cds-grid-cell>
        <cds-grid-cell>deactivated</cds-grid-cell>
        <cds-grid-cell>0%</cds-grid-cell>
        <cds-grid-cell>0%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>vm-host-010</cds-grid-cell>
        <cds-grid-cell>disruption</cds-grid-cell>
        <cds-grid-cell>50%</cds-grid-cell>
        <cds-grid-cell>60%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>vm-host-009</cds-grid-cell>
        <cds-grid-cell>disruption</cds-grid-cell>
        <cds-grid-cell>65%</cds-grid-cell>
        <cds-grid-cell>90%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>vm-host-012</cds-grid-cell>
        <cds-grid-cell>offline</cds-grid-cell>
        <cds-grid-cell>85%</cds-grid-cell>
        <cds-grid-cell>70%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>vm-host-013</cds-grid-cell>
        <cds-grid-cell>deactivated</cds-grid-cell>
        <cds-grid-cell>0%</cds-grid-cell>
        <cds-grid-cell>0%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-footer></cds-grid-footer>
    </cds-grid>
  `;
}

export function keyboard() {
  return html`
    <cds-grid aria-label="keyboard navigation datagrid demo" style="--body-height: 360px">
      <cds-grid-column width="200px">Key</cds-grid-column>
      <cds-grid-column>Function</cds-grid-column>
      <cds-grid-row>
        <cds-grid-cell>Right Arrow</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>Moves focus one cell to the right.</li>
            <li>If focus is on the right-most cell in the row, focus does not move.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Left Arrow</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>Moves focus one cell to the left.</li>
            <li>If focus is on the left-most cell in the row, focus does not move.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Down Arrow</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>Moves focus one cell down.</li>
            <li>If focus is on the bottom cell in the column, focus does not move.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Up Arrow</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>Moves focus one cell Up.</li>
            <li>If focus is on the top cell in the column, focus does not move.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Page Down</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>
              Moves focus down five rows, scrolling so the bottom row in the currently visible set of rows becomes the
              first visible row.
            </li>
            <li>If focus is in the last row, focus does not move.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Page Up</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>
              Moves focus up 5 rows, scrolling so the top row in the currently visible set of rows becomes the last
              visible row.
            </li>
            <li>If focus is in the first row of the grid, focus does not move.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Home</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>Moves focus to the first cell in the row that contains focus.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>End</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>Moves focus to the last cell in the row that contains focus.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Control + Home</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>Moves focus to the first cell in the first row.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Control + End</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>Moves focus to the last cell in the last row.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-footer>
        <a
          cds-text="subsection link"
          href="https://www.w3.org/TR/wai-aria-practices/examples/grid/dataGrids.html#kbd_label"
          >spec</a
        >
      </cds-grid-footer>
    </cds-grid>
  `;
}

export function darkTheme() {
  class DemoDarkTheme extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid cds-theme="dark" aria-label="dark theme datagrid demo" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
        </cds-grid>`;
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-dark-theme', DemoDarkTheme);
  return html`<demo-grid-dark-theme></demo-grid-dark-theme>`;
}

export function columnResize() {
  class DemoColumnResize extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="column resize datagrid demo" style="--body-height: 360px">
          <cds-grid-column resizable>Host</cds-grid-column>
          <cds-grid-column resizable>Status</cds-grid-column>
          <cds-grid-column resizable>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-column-resize', DemoColumnResize);
  return html`<demo-grid-column-resize></demo-grid-column-resize>`;
}

export function columnFlexWidth() {
  class DemoColumnFlexWidth extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="column flex width datagrid demo" column-layout="flex" style="--body-height: 360px">
          <cds-grid-column resizable>Host</cds-grid-column>
          <cds-grid-column resizable>Status</cds-grid-column>
          <cds-grid-column resizable>CPU</cds-grid-column>
          <cds-grid-column resizable>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-column-flex-width', DemoColumnFlexWidth);
  return html`<demo-grid-column-flex-width></demo-grid-column-flex-width>`;
}

export function columnFixedWidth() {
  class DemoColumnFixedWidth extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="column fixed width datagrid demo" style="--body-height: 360px">
          <cds-grid-column width="150px">Host</cds-grid-column>
          <cds-grid-column width="150px">Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-column-fixed-width', DemoColumnFixedWidth);
  return html`<demo-grid-column-fixed-width></demo-grid-column-fixed-width>`;
}

export function columnOverflow() {
  const data = getVMData();
  data[0].cpu = 25.00000001;
  data[0].memory = 50.00000001;
  class DemoColumnOverflow extends LitElement {
    @state() private data = data;

    render() {
      return html`
        <cds-grid aria-label="column overflow datagrid demo" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column width="100px">CPU</cds-grid-column>
          <cds-grid-column width="100px">Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell><p cds-text="truncate">${entry.cpu}%</p></cds-grid-cell>
            <cds-grid-cell><p cds-text="truncate">${entry.memory}%</p></cds-grid-cell>
          </cds-grid-row>`)}
        </cds-grid>`;
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-column-overflow', DemoColumnOverflow);
  return html`<demo-grid-column-overflow></demo-grid-column-overflow>`;
}

export function rtl() {
  class DemoRtl extends LitElement {
    @state() private data = getVMData();
    @state() private currentVM: TestVM;
    @state() private anchor: HTMLElement;

    render() {
      return html`
        <cds-grid dir="rtl" aria-label="row detail datagrid demo" style="--body-height: 360px">
          <cds-grid-column type="action" aria-label="row detail column"></cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell type="action">
              <!-- todo: support inverse direction for icon and rtl -->
              <cds-action-expand action="detail" .expanded=${this.currentVM?.id === entry.id} @click=${(e: any) => this.showDetail(e, entry)}></cds-action-expand>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
          ${this.currentVM ? html`
          <cds-grid-detail .anchor=${this.anchor} @closeChange=${(): void => (this.currentVM = null)}>
            <h2 cds-text="section">${this.currentVM?.id}</h2>
            <p cds-text="body">Status: ${this.currentVM?.status}</p>
            <p cds-text="body">CPU: ${this.currentVM?.cpu}%</p>
            <p cds-text="body">Memory: ${this.currentVM?.memory}%</p>
          </cds-grid-detail>` : ''}
        </cds-grid>`;
    }

    private showDetail(event: any, vm: TestVM) {
      if (this.currentVM?.id !== vm.id) {
        this.currentVM = vm;
        this.anchor = event.target;
      } else {
        this.currentVM = null;
      }
    }
  }

  registerElementSafely('demo-grid-rtl', DemoRtl);
  return html`<demo-grid-rtl></demo-grid-rtl>`;
}

export function responsive() {
  class DemoResponsive extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="responsive datagrid demo" style="width: 320px; --body-height: 420px">
          <cds-grid-column position="fixed" width="120px">Host</cds-grid-column>
          <cds-grid-column width="200px">Status</cds-grid-column>
          <cds-grid-column width="200px">CPU</cds-grid-column>
          <cds-grid-column width="200px">Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell role="rowheader">${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-responsive', DemoResponsive);
  return html`<demo-grid-responsive></demo-grid-responsive>`;
}

export function placeholder() {
  return html`
    <cds-grid aria-label="placeholder datagrid demo" style="--body-height: 360px">
      <cds-grid-column>Host</cds-grid-column>
      <cds-grid-column>Status</cds-grid-column>
      <cds-grid-column>CPU</cds-grid-column>
      <cds-grid-column>Memory</cds-grid-column>
      <cds-grid-placeholder>
        <p cds-text="subsection">No VMs were found.</p>
      </cds-grid-placeholder>
      <cds-grid-footer></cds-grid-footer>
    </cds-grid>
  `;
}

export function kitchenSink() {
  enum ColumnTypes {
    Host = 1,
    Status = 2,
    CPU = 4,
    Memory = 8,
    All = ColumnTypes.Host | ColumnTypes.Status | ColumnTypes.CPU | ColumnTypes.Memory,
  }

  interface GridState {
    data: TestVM[];
    orderPreference: string[];
    currentDetail: string;
    sortType: 'none' | 'ascending' | 'descending',
    search: string,
    page: number,
    pageSize: number,
    idFilterAnchor: HTMLElement,
    columnsDropdownAnchor: HTMLElement,
    detailAnchor: HTMLElement,
    selectedColumns: ColumnTypes
  }

  const initialState: GridState = {
    data: getVMData(),
    orderPreference: getVMData().map(vm => vm.id),
    selectedColumns: ColumnTypes.All,
    currentDetail: null,
    sortType: 'none',
    pageSize: 10,
    search: '',
    page: 0,
    idFilterAnchor: null,
    columnsDropdownAnchor: null,
    detailAnchor: null
  };

  class DemoKitchenSink extends LitElement {
    @state() private state: GridState = initialState;

    get selected() {
      return this.state.data.filter(i => i.selected);
    }

    render() {
      return html`
        <cds-grid aria-label="Active VM Management" style="--body-height: 360px">
          <cds-grid-column type="action" resizable="hidden">
            <cds-checkbox>
              <input type="checkbox" .checked=${this.selected.length === this.state.data.length} .indeterminate=${(this.selected.length > 0) && (this.selected.length < this.state.data.length)} @change=${(e: any) => this.selectAll(e)} aria-label="select all hosts" />
            </cds-checkbox>
          </cds-grid-column>
          <cds-grid-column type="action" aria-label="expand row detail column"></cds-grid-column>
          <cds-grid-column resizable width="180px">
            Host <cds-action @click=${(e: any) => (this.state = { ...this.state, idFilterAnchor: e.target })} aria-label="column filter options" shape="filter" .status=${this.state.search ? 'active' : ''}></cds-action>
          </cds-grid-column>
          ${this.columnVisible(ColumnTypes.Status) ? html`
          <cds-grid-column resizable width="180px">
            Status <cds-action-sort .sort=${this.state.sortType} @sortChange=${(e: any) => this.setSortType(e.detail)}></cds-action-sort>
          </cds-grid-column>`: ''}
          ${this.columnVisible(ColumnTypes.CPU) ? html`<cds-grid-column resizable>CPU</cds-grid-column>`: ''}
          ${this.columnVisible(ColumnTypes.Memory) ? html`<cds-grid-column resizable>Memory</cds-grid-column>` : ''}
          ${this.currentPage.map(entry => html`
          <cds-grid-row .selected=${entry.selected}>
            <cds-grid-cell type="action">
              <cds-checkbox>
                <input type="checkbox" .checked=${entry.selected} value=${entry.id} @click=${(e: any) => this.select(entry, e.target.checked)} aria-label="select host ${entry.id}" />
              </cds-checkbox>
            </cds-grid-cell>
            <cds-grid-cell type="action">
              <cds-action-expand action="detail" .expanded=${this.currentDetail?.id === entry.id} @click=${(e: any) => this.showDetail(entry.id, e.target)}></cds-action-expand>
            </cds-grid-cell>
            <cds-grid-cell role="rowheader">${entry.id}</cds-grid-cell>
            ${this.columnVisible(ColumnTypes.Status) ? html`
              <cds-grid-cell>
                <cds-tag status=${StatusDisplayType[entry.status]} readonly><cds-icon shape=${StatusIconType[entry.status]} inner-offset=${entry.status === 'deactivated' ? 0 : 3 }></cds-icon> ${entry.status}</cds-tag>
              </cds-grid-cell>` : ''}
            ${this.columnVisible(ColumnTypes.CPU) ? html`<cds-grid-cell>${entry.cpu}%</cds-grid-cell>` : ''}
            ${this.columnVisible(ColumnTypes.Memory) ? html`<cds-grid-cell>${entry.memory}%</cds-grid-cell>` : ''}
          </cds-grid-row>`)}
          <cds-grid-footer>
            <cds-action @click=${(e: any) => (this.state = { ...this.state, columnsDropdownAnchor: e.target })} aria-label="filter columns" shape="view-columns" .status=${!this.columnVisible(ColumnTypes.All) ? 'active' : ''}></cds-action>
            <cds-pagination>
              <span style="margin-right: auto;">${this.state.data.filter(i => i.selected).length} selected</span>
              <cds-select control-width="shrink">
                <select value="${this.state.pageSize}" @input=${this.setPageSize} aria-label="per page">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="25">25</option>
                </select>
              </cds-select>
              <cds-pagination-button ?disabled=${this.state.page === 0} action="first" @click=${this.firstPage} aria-label="go to first"></cds-pagination-button>
              <cds-pagination-button ?disabled=${this.state.page === 0} action="prev" @click=${this.prevPage} aria-label="go to previous"></cds-pagination-button>
              <cds-input cds-pagination-number>
                <input type="number" aria-label="current page" @input=${this.setPage} value=${this.state.page + 1} min="1" max=${this.pageCount} />
                <cds-control-message>/ ${this.pageCount}</cds-control-message>
              </cds-input>
              <cds-pagination-button ?disabled=${this.state.page === this.pageCount - 1} action="next" @click=${this.nextPage} aria-label="go to next"></cds-pagination-button>
              <cds-pagination-button ?disabled=${this.state.page === this.pageCount - 1} action="last" @click=${this.lastPage} aria-label="go to last"></cds-pagination-button>
            </cds-pagination>
          </cds-grid-footer>
          <cds-grid-detail ?hidden=${!this.currentDetail} .anchor=${this.state.detailAnchor} @closeChange=${this.closeDetail}>
            <section cds-layout="vertical gap:xxl">
              <div cds-layout="horizontal gap:md">
                <h2 cds-text="heading">${this.currentDetail?.id}</h2>
                <cds-tag status=${StatusDisplayType[this.currentDetail?.status]} readonly>
                  <cds-icon shape=${StatusIconType[this.currentDetail?.status]} size=${this.currentDetail?.status === 'deactivated' ? 15 : 16 } inner-offset=${this.currentDetail?.status === 'deactivated' ? 0 : 3 }></cds-icon>
                  ${this.currentDetail?.status}
                </cds-tag>
              </div>
              <div cds-layout="grid cols:6">
                <div cds-layout="vertical gap:md align:center">
                  <cds-progress-circle size="xxl" status=${StatusDisplayType[this.currentDetail?.status]} value=${this.currentDetail?.cpu}></cds-progress-circle>
                  <p cds-text="subsection">CPU: ${this.currentDetail?.cpu}%</p>
                </div>
                <div cds-layout="vertical gap:md align:center">
                  <cds-progress-circle size="xxl" status=${StatusDisplayType[this.currentDetail?.status]} value=${this.currentDetail?.memory}></cds-progress-circle>
                  <p cds-text="subsection">Memory: ${this.currentDetail?.memory}%</p>
                </div>
              </div>
            </section>
          </cds-grid-detail>
        </cds-grid>
        ${this.state.idFilterAnchor ? html`
        <cds-dropdown @closeChange=${() => (this.state = { ...this.state, idFilterAnchor: null as any })} .anchor=${this.state.idFilterAnchor}>
          <cds-input>
            <input type="text" placeholder="Search" aria-label="search rows" .value=${this.state.search} @input=${(e: any) => this.search(e.target.value)} />
          </cds-input>
        </cds-dropdown>` : ''}
        ${this.state.columnsDropdownAnchor ? html`
        <cds-dropdown @closeChange=${() => (this.state = { ...this.state, columnsDropdownAnchor: null as any })} .anchor=${this.state.columnsDropdownAnchor} position="top">
          <cds-checkbox-group layout="vertical">
            <cds-checkbox>
              <label>Status</label>
              <input type="checkbox" value=${ColumnTypes.Status} @click=${this.selectColumns} .checked=${this.columnVisible(ColumnTypes.Status)} />
            </cds-checkbox>
            <cds-checkbox>
              <label>CPU</label>
              <input type="checkbox" value=${ColumnTypes.CPU} @click=${this.selectColumns} .checked=${this.columnVisible(ColumnTypes.CPU)} />
            </cds-checkbox>
            <cds-checkbox>
              <label>Memory</label>
              <input type="checkbox" value=${ColumnTypes.Memory} @click=${this.selectColumns} .checked=${this.columnVisible(ColumnTypes.Memory)} />
            </cds-checkbox>
          </cds-checkbox-group>
          <cds-divider></cds-divider>
          <cds-button action="flat" @click=${() => (this.state = { ...this.state, selectedColumns: ColumnTypes.All })} ?disabled=${this.columnVisible(ColumnTypes.All)}>Select All</cds-button>
        </cds-dropdown>` : ''}
        <br />
        <section cds-layout="vertical gap:lg">
          <cds-button action="outline" @click=${this.resetState}>clear local storage</cds-button>
          <pre style="width: 100%; overflow: auto;">${JSON.stringify({ ...this.state, idFilterAnchor: null, columnsDropdownAnchor: null, detailAnchor: null, data: this.state.data.map(i => i.id).join(','), orderPreference: this.state.orderPreference.join(',') }, null, 2)}</pre>
        </section>`;
    }

    connectedCallback() {
      super.connectedCallback();
      this.state = JSON.parse(localStorage.getItem('CORE_KITCHEN_SINK_DEMO')) ?? this.state;
    }

    updated(props: PropertyValues) {
      super.updated(props);
      localStorage.setItem('CORE_KITCHEN_SINK_DEMO', JSON.stringify({ ...this.state, idFilterAnchor: null, columnsDropdownAnchor: null, detailAnchor: null }));
    }

    private get currentDetail() {
      return this.state.data.find(i => i.id === this.state.currentDetail);
    }

    private get pageCount() {
      return Math.ceil(this.state.data.length / this.state.pageSize);
    }

    private get currentPage() {
      return paginate<TestVM>(this.sortedData, this.state.pageSize)[this.state.page] ?? []
    }

    private get sortedData() {
      return pipe(
        (d: TestVM[]) => d.sort((a, b) => this.state.orderPreference.indexOf(a.id) > this.state.orderPreference.indexOf(b.id) ? 1 : -1),
        d => filter<TestVM>(d, 'id', this.state.search),
        d => sortStrings<TestVM>(d, 'status', this.state.sortType)
      )([...this.state.data]);
    }

    private setSortType(sortType: 'none' | 'ascending' | 'descending') {
      this.state = { ...this.state, sortType };
    }

    private search(value: string) {
      this.state = { ...this.state, search: value, page: 0 };
    }

    private showDetail(id: string, detailAnchor: HTMLElement) {
      this.state = { ...this.state, currentDetail: id !== this.state.currentDetail ? this.state.data.find(i => i.id === id).id : null, detailAnchor };
    }

    private closeDetail() {
      this.state = { ...this.state, currentDetail: null };
    }

    private select(entry: any, checked: boolean) {
      this.state.data.find(i => i.id === entry.id).selected = checked;
      this.state = { ...this.state };
    }

    private selectAll(e: any) {
      this.state.data.forEach(i => (i.selected = e.target.checked));
      this.state = { ...this.state };
    }

    private resetState() {
      localStorage.removeItem('CORE_KITCHEN_SINK_DEMO');
      this.state = initialState;
    }

    private selectColumns() {
      this.state = {
        ...this.state,
        selectedColumns: Array.from(this.querySelectorAll<HTMLInputElement>('cds-checkbox-group input[type="checkbox"]'))
          .filter(c => c.checked)
          .reduce((p, n) => p + parseInt(n.value), 1)
      };
    }

    private columnVisible(value: any) {
      return parseInt(value) === (this.state.selectedColumns & parseInt(value));
    }

    private setPageSize(event: any) {
      this.state = { ...this.state, pageSize: parseInt(event.target.value) };
    }

    private setPage(event: any) {
      this.state = { ...this.state, page: parseInt(event.target.value) - 1 };
    }

    private nextPage() {
      if (this.state.page <= this.pageCount) {
        this.state = { ...this.state, page: this.state.page + 1 };
      }
    }

    private prevPage() {
      if (this.state.page > 0) {
        this.state = { ...this.state, page: this.state.page - 1 };
      }
    }

    private firstPage() {
      this.state = { ...this.state, page: 0 };
    }

    private lastPage() {
      this.state = { ...this.state, page: Math.ceil(this.state.data.length / this.state.pageSize) - 1 };
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-kitchen-sink', DemoKitchenSink);
  return html`<demo-grid-kitchen-sink></demo-grid-kitchen-sink>`;
}

export function pagination() {
  class DemoPagination extends LitElement {
    @state() private data = getVMData();
    @state() private filteredList: TestVM[] = [];
    @state() private search = '';
    @state() private currentPage = 0;
    @state() private pageSize = 10;
    @state() private pageCount = 1;

    render() {
      return html`
        <cds-grid aria-label="pagination datagrid demo" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.filteredList.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer>
            <cds-pagination aria-label="pagination">
              <cds-select control-width="shrink">
                <select @input=${(e: any) => (this.pageSize = e.target.value)} style="width: 46px" aria-label="per page">
                  <option value="5">5</option>
                  <option value="10" selected>10</option>
                  <option value="15">15</option>
                  <option value="25">25</option>
                </select>
              </cds-select>
              <cds-pagination-button aria-label="go to first" ?disabled=${this.currentPage === 0} action="first" @click=${this.firstPage}></cds-pagination-button>
              <cds-pagination-button aria-label="go to previous" ?disabled=${this.currentPage === 0} action="prev" @click=${this.prevPage}></cds-pagination-button>
              <cds-input cds-pagination-number>
                <input type="number" size="1" aria-label="current page" @input=${this.setPage} .valueAsNumber=${this.currentPage + 1} min="1" max=${this.pageCount} />
                <cds-control-message>/ ${this.pageCount}</cds-control-message>
              </cds-input>
              <cds-pagination-button aria-label="go to next" ?disabled=${this.currentPage === this.pageCount - 1} action="next" @click=${this.nextPage}></cds-pagination-button>
              <cds-pagination-button aria-label="go to last" ?disabled=${this.currentPage === this.pageCount - 1} action="last" @click=${this.lastPage}></cds-pagination-button>
            </cds-pagination>
          </cds-grid-footer>
        </cds-grid>`;
    }

    connectedCallback() {
      super.connectedCallback();
      this.updateList();
    }

    updated(props: PropertyValues) {
      super.updated(props);
      if (
        (props.has('currentPage') && props.get('currentPage') !== this.currentPage) ||
        (props.has('search') && props.get('search') !== this.search) ||
        (props.has('pageSize') && props.get('pageSize') !== this.pageSize)
      ) {
        this.updateList();
      }

      if (props.has('search') && props.get('search') !== this.search) {
        this.firstPage();
      }
    }

    private updateList() {
      const list = filter([...this.data], 'id', this.search);
      this.pageCount = Math.ceil(list.length / this.pageSize);
      this.filteredList = paginate(list, this.pageSize)[this.currentPage] ?? [];
    }

    private setPage(event: any) {
      this.currentPage = parseInt(event.target.value) - 1;
    }

    private nextPage() {
      if (this.currentPage <= this.pageCount) {
        this.currentPage++;
      }
    }

    private prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    }

    private firstPage() {
      this.currentPage = 0;
    }

    private lastPage() {
      this.currentPage = Math.ceil(this.data.length / this.pageSize) - 1;
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-pagination', DemoPagination);
  return html`<demo-grid-pagination></demo-grid-pagination>`;
}

export function columnVisibility() {
  enum ColumnTypes {
    Host = 1,
    Status = 2,
    CPU = 4,
    Memory = 8,
    All = ColumnTypes.Host | ColumnTypes.Status | ColumnTypes.CPU | ColumnTypes.Memory,
  }

  class DemoColumnVisibility extends LitElement {
    @state() private data = getVMData();
    @state() private selectedColumns = ColumnTypes.All;
    @state() private columnAnchor: HTMLElement;

    render() {
      return html`
        <cds-grid aria-label="column visibility datagrid demo" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          ${this.checked(ColumnTypes.Status) ? html`<cds-grid-column>Status</cds-grid-column>` : ''}
          ${this.checked(ColumnTypes.CPU) ? html`<cds-grid-column>CPU</cds-grid-column>` : ''}
          ${this.checked(ColumnTypes.Memory) ? html`<cds-grid-column>Memory</cds-grid-column>` : ''}
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            ${this.checked(ColumnTypes.Status) ? html`<cds-grid-cell>${entry.status}</cds-grid-cell>` : ''}
            ${this.checked(ColumnTypes.CPU) ? html`<cds-grid-cell>${entry.cpu}%</cds-grid-cell>` : ''}
            ${this.checked(ColumnTypes.Memory) ? html`<cds-grid-cell>${entry.memory}%</cds-grid-cell>` : ''}
          </cds-grid-row>`)}
          <cds-grid-footer>
            <cds-action @click=${(e: any) => (this.columnAnchor = e.target)} aria-label="filter column" shape="view-columns" .status=${!this.checked(ColumnTypes.All) ? 'active' : ''}></cds-action>
          </cds-grid-footer>
        </cds-grid>
        ${this.columnAnchor ? html`
        <cds-dropdown @closeChange=${(): void => this.columnAnchor = null} .anchor=${this.columnAnchor} position="top">
          <cds-checkbox-group layout="vertical">
            <cds-checkbox>
              <label>Status</label>
              <input type="checkbox" value=${ColumnTypes.Status} @click=${this.selectColumns} .checked=${this.checked(ColumnTypes.Status)} />
            </cds-checkbox>
            <cds-checkbox>
              <label>CPU</label>
              <input type="checkbox" value=${ColumnTypes.CPU} @click=${this.selectColumns} .checked=${this.checked(ColumnTypes.CPU)} />
            </cds-checkbox>
            <cds-checkbox>
              <label>Memory</label>
              <input type="checkbox" value=${ColumnTypes.Memory} @click=${this.selectColumns} .checked=${this.checked(ColumnTypes.Memory)} />
            </cds-checkbox>
          </cds-checkbox-group>
          <cds-button action="flat" @click=${this.selectAll} ?disabled=${this.checked(ColumnTypes.All)}>
            Select All
          </cds-button>
        </cds-dropdown>` : ''}`;
    }

    private selectColumns() {
      this.selectedColumns = Array.from(this.shadowRoot.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'))
        .filter(c => c.checked)
        .map(c => parseInt(c.value))
        .reduce((p, n) => p + n, 1);
    }

    private selectAll() {
      this.selectedColumns = ColumnTypes.All;
    }

    private checked(value: ColumnTypes) {
      return value === (this.selectedColumns & value);
    }
  }

  registerElementSafely('demo-grid-column-visibility', DemoColumnVisibility);
  return html`<demo-grid-column-visibility></demo-grid-column-visibility>`;
}

export function rowDetail() {
  class DemoRowDetail extends LitElement {
    @state() private data = getVMData();
    @state() private currentVM: TestVM;
    @state() private anchor: HTMLElement;

    render() {
      return html`
        <cds-grid aria-label="row detail datagrid demo" style="--body-height: 360px">
          <cds-grid-column type="action" aria-label="row detail column"></cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell type="action">
              <cds-action-expand aria-label="view host ${entry.id} details" action="detail" .expanded=${this.currentVM?.id === entry.id} @click=${(e: any) => this.showDetail(e, entry)}></cds-action-expand>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
          ${this.currentVM ? html`
          <cds-grid-detail .anchor=${this.anchor} @closeChange=${() => (this.currentVM = null) as any}>
            <h2 cds-text="section">${this.currentVM?.id}</h2>
            <p cds-text="body">Status: ${this.currentVM?.status}</p>
            <p cds-text="body">CPU: ${this.currentVM?.cpu}%</p>
            <p cds-text="body">Memory: ${this.currentVM?.memory}%</p>
          </cds-grid-detail>` : ''}
        </cds-grid>`;
    }

    private showDetail(event: any, vm: TestVM) {
      if (this.currentVM?.id !== vm.id) {
        this.currentVM = vm;
        this.anchor = event.target;
      } else {
        this.currentVM = null;
      }
    }
  }

  registerElementSafely('demo-grid-row-detail', DemoRowDetail);
  return html`<demo-grid-row-detail></demo-grid-row-detail>`;
}

export function rowSingleSelect() {
  const selectableData = getVMData();
  selectableData[1].selected = true;

  class DemoRowSingleSelect extends LitElement {
    @state() private data = selectableData;

    @state() private selectedItem = selectableData[1];

    render() {
      return html`
        <cds-grid aria-label="row single select datagrid demo" style="--body-height: 360px">
          <cds-grid-column type="action" aria-label="host selection column"></cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row .selected=${entry.selected}>
            <cds-grid-cell type="action">
              <cds-radio>
                <input type="radio" name="hosts" .checked=${entry.selected} value=${entry.id} aria-label="select host ${entry.id}" @click=${(e: any) => this.select(entry, e.target.checked)} />
              </cds-radio>
            </cds-grid-cell>
            <cds-grid-cell>
              ${entry.id}
            </cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer>
            Selected: ${this.selectedItem.id}
          </cds-grid-footer>
        </cds-grid>
      `;
    }

    private select(entry: any, checked: boolean) {
      this.data.forEach(i => (i.selected = false));
      this.selectedItem = this.data.find(i => i.id === entry.id);
      this.selectedItem.selected = checked;
      this.data = [...this.data];
    }
  }

  registerElementSafely('demo-grid-row-single-select', DemoRowSingleSelect);
  return html`<demo-grid-row-single-select></demo-grid-row-single-select>`;
}

export function rowMultiSelect() {
  const selectableData = getVMData()
  selectableData[1].selected = true;
  selectableData[3].selected = true;


  class DemoRowMultiSelect extends LitElement {
    @state() private data = selectableData;

    get selected() {
      return this.data.filter(i => i.selected);
    }

    render() {
      return html`
        <cds-grid aria-label="row multi select datagrid demo" aria-multiselectable="true" style="--body-height: 360px">
          <cds-grid-column type="action">
            <cds-checkbox>
              <input type="checkbox" .checked=${this.selected.length === this.data.length} .indeterminate=${(this.selected.length > 0) && (this.selected.length < this.data.length)} @change=${(e: any) => this.selectAll(e)} aria-label="select all hosts" />
            </cds-checkbox>
          </cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row .selected=${entry.selected}>
            <cds-grid-cell type="action">
              <cds-checkbox>
                <input type="checkbox" .checked=${entry.selected} value=${entry.id} @change=${(e: any) => this.select(entry, e)} aria-label="select host ${entry.id}" />
              </cds-checkbox>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer>${this.data.filter(i => i.selected).length} selected</cds-grid-footer>
        </cds-grid>`;
    }

    private select(entry: TestVM, e: Event) {
      this.data.find(i => i.id === entry.id).selected = (e.target as HTMLInputElement).checked;
      this.data = [...this.data];
    }

    private selectAll(e: Event) {
      this.data.forEach(i => (i.selected = (e.target as HTMLInputElement).checked));
      this.data = [...this.data];
    }
  }

  registerElementSafely('demo-grid-row-multi-select', DemoRowMultiSelect);
  return html`<demo-grid-row-multi-select></demo-grid-row-multi-select>`;
}

export function rowAction() {
  class DemoRowAction extends LitElement {
    @state() private data = getVMData();
    @state() private selectedEntry: any = null;
    @state() private anchor: HTMLElement = null;

    render() {
      return html`
        <cds-grid aria-label="row action datagrid demo" style="--body-height: 360px">
          <cds-grid-column type="action" aria-label="selection column"></cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell type="action">
              <cds-action popup="row-actions" aria-label="host actions" @click=${(e: any) => this.select(e, entry)}></cds-action>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        <cds-dropdown ?hidden=${!this.selectedEntry} id="row-actions" .anchor=${this.anchor} @closeChange=${() => (this.selectedEntry = null) as any}>
          <cds-button action="flat" size="sm" @click=${() => this.shutdown(this.selectedEntry)}>Shutdown ${this.selectedEntry?.id}</cds-button>
          <cds-button action="flat" size="sm" @click=${() => this.restart(this.selectedEntry)}>Restart ${this.selectedEntry?.id}</cds-button>
        </cds-dropdown>`;
    }

    private select(e: any, entry: TestVM) {
      this.selectedEntry = entry;
      this.anchor = e.target;
    }

    private shutdown(entry: any) {
      alert(`Shutdown: ${entry.id}`);
      this.selectedEntry = null;
    }

    private restart(entry: any) {
      alert(`Restarted: ${entry.id}`);
      this.selectedEntry = null;
    }
  }

  registerElementSafely('demo-grid-row-action', DemoRowAction);
  return html`<demo-grid-row-action></demo-grid-row-action>`;
}

export function rowBatchAction() {
  class DemoRowBatchAction extends LitElement {
    @state() private data = getVMData();
    @state() private batchActionAnchor: HTMLElement;

    get selected() {
      return this.data.filter(i => i.selected);
    }

    render() {
      return html`
        <cds-grid aria-label="row batch action datagrid demo" style="--body-height: 360px">
          <cds-grid-column type="action">
            <cds-checkbox>
              <input type="checkbox" .checked=${this.selected.length === this.data.length} .indeterminate=${(this.selected.length > 0) && (this.selected.length < this.data.length)} @change=${(e: any) => this.selectAll(e)} aria-label="select all hosts" />
            </cds-checkbox>
          </cds-grid-column>
          <cds-grid-column>
            Host <cds-action popup="row-actions" @click=${(e: any) => this.batchActionAnchor = e.target} aria-label="available host options"></cds-action>
          </cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row .selected=${entry.selected}>
            <cds-grid-cell type="action">
              <cds-checkbox>
                <input type="checkbox" .checked=${entry.selected} value=${entry.id} @click=${(e: any) => this.select(entry, e.target.checked)} aria-label="select host ${entry.id}" />
              </cds-checkbox>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        ${this.batchActionAnchor ? html`
        <cds-dropdown id="row-actions" .anchor=${this.batchActionAnchor} @closeChange=${() => (this.batchActionAnchor = null as any)} position="bottom">
          <cds-button action="flat" size="sm" @click=${() => this.action('Restart')}>Restart Selected</cds-button>
          <cds-button action="flat" size="sm" @click=${() => this.action('Shutdown')}>Shutdown Selected</cds-button>
        </cds-dropdown>` : ''}
      `;
    }

    private select(entry: any, checked: boolean) {
      this.data.find(i => i.id === entry.id).selected = checked;
      this.data = [...this.data];
    }

    private selectAll(e: any) {
      this.data.forEach(i => (i.selected = e.target.checked));
      this.data = [...this.data];
    }

    private action(name: string) {
      alert(`${name}: ${this.data.filter(i => i.selected).map(i => i.id).reduce((p, n) => `${p} ${n}`, '')}`);
      this.batchActionAnchor = null;
      this.data.forEach(i => (i.selected = false));
    }
  }

  registerElementSafely('demo-grid-row-batch-action', DemoRowBatchAction);
  return html`<demo-grid-row-batch-action></demo-grid-row-batch-action>`;
}

export function rowSort() {
  class DemoRowSort extends LitElement {
    @state() private data = getVMData();
    @state() private filteredList: TestVM[] = [];
    @state() private sortType: 'none' | 'ascending' | 'descending' = 'none';

    render() {
      return html`
        <cds-grid aria-label="row sort datagrid demo" style="--body-height: 360px">
          <cds-grid-column>
            Host <cds-action-sort aria-label="sort hosts" .sort=${this.sortType} @sortChange=${(e: any) => (this.sortType = e.detail)}></cds-action-sort>
          </cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.filteredList.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }

    updated(props: PropertyValues) {
      super.updated(props);
      if (props.has('sortType') && props.get('sortType') !== this.sortType) {
        this.filteredList = sortStrings([...this.data], 'id', this.sortType);
      }
    }
  }

  registerElementSafely('demo-grid-row-sort', DemoRowSort);
  return html`<demo-grid-row-sort></demo-grid-row-sort>`;
}

export function rowMultiSort() {
  class DemoRowMultiSort extends LitElement {
    @state() private data = getVMData();
    @state() private filteredList: TestVM[] = [];
    @state() private sortState: { [key: string]: 'none' | 'ascending' | 'descending' } = { id: 'none', status: 'none' };

    render() {
      return html`
        <cds-grid aria-label="row multi sort datagrid demo" style="--body-height: 360px">
          <cds-grid-column>
            Host <cds-action-sort aria-label="sort host" .sort=${this.sortState.id} @sortChange=${(e: any) => (this.sortState = { ...this.sortState, id: e.detail })}></cds-action-sort>
          </cds-grid-column>
          <cds-grid-column>
            Status <cds-action-sort aria-label="sort status" .sort=${this.sortState.status} @sortChange=${(e: any) => (this.sortState = { ...this.sortState, status: e.detail })}></cds-action-sort>
          </cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.filteredList.map(entry => html`
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

    updated(props: PropertyValues) {
      super.updated(props);
      if (props.has('sortState')) {
        this.updateList();
      }
    }

    private updateList() {
      let list = [...this.data];
      list = sortStrings(list, 'id', this.sortState.id);
      list = sortStrings(list, 'status', this.sortState.status);
      this.filteredList = list;
    }
  }

  registerElementSafely('demo-grid-row-multi-sort', DemoRowMultiSort);
  return html`<demo-grid-row-multi-sort></demo-grid-row-multi-sort>`;
}

export function columnFilter() {
  class DemoColumnFilter extends LitElement {
    @state() private data = getVMData();
    @state() private filteredList: TestVM[] = [];
    @state() private search = '';
    @state() private anchor: HTMLElement = null

    render() {
      return html`
        <cds-grid aria-label="column filter datagrid demo" style="--body-height: 360px">
          <cds-grid-column>
            Host <cds-action @click=${(e: any) => (this.anchor = e.target)} shape="filter" .status=${this.search ? 'active' : ''} aria-label="search hosts"></cds-action>
          </cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.filteredList.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        ${this.anchor ? html`
        <cds-dropdown @closeChange=${() => (this.anchor = null) as any} .anchor=${this.anchor}>
          <cds-input>
            <input type="text" aria-label="search hosts" placeholder="Search" .value=${this.search} @input=${(e: any) => (this.search = e.target.value)} />
          </cds-input>
        </cds-dropdown>` : ''}
        `;
    }

    updated(props: PropertyValues) {
      super.updated(props);
      if (props.has('search') && props.get('search') !== this.search) {
        this.filteredList = filter([...this.data], 'id', this.search);
      }
    }
  }

  registerElementSafely('demo-grid-column-filter', DemoColumnFilter);
  return html`<demo-grid-column-filter></demo-grid-column-filter>`;
}

export function columnMultiFilter() {
  class DemoColumnMultiFilter extends LitElement {
    @state() private data = getVMData();
    @state() private filteredList: TestVM[] = [];
    @state() private search = '';

    render() {
      return html`
        <section cds-layout="vertical gap:md">
          <cds-search control-width="shrink">
            <label>Search VMs</label>
            <input type="search" placeholder="search" @input=${(e: any) => (this.search = e.target.value)} />
          </cds-search>
          <cds-grid aria-label="column multi filter datagrid demo" style="--body-height: 360px">
            <cds-grid-column>Host</cds-grid-column>
            <cds-grid-column>Status</cds-grid-column>
            <cds-grid-column>CPU</cds-grid-column>
            <cds-grid-column>Memory</cds-grid-column>
            ${this.filteredList.map(entry => html`
            <cds-grid-row>
              <cds-grid-cell>${entry.id}</cds-grid-cell>
              <cds-grid-cell>${entry.status}</cds-grid-cell>
              <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
              <cds-grid-cell>${entry.memory}%</cds-grid-cell>
            </cds-grid-row>`)}
            <cds-grid-footer></cds-grid-footer>
          </cds-grid>
        </section>`;
    }

    updated(props: PropertyValues) {
      super.updated(props);
      if (props.has('search') && props.get('search') !== this.search) {
        this.filteredList = [...this.data].filter(i =>
          Object.keys(i)
            .map(k => (i as any)[k])
            .reduce((p, n) => `${p} ${n}`)
            .toLocaleLowerCase()
            .includes(this.search.trim().toLocaleLowerCase())
        );
      }
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-column-multi-filter', DemoColumnMultiFilter);
  return html`<demo-grid-column-multi-filter></demo-grid-column-multi-filter>`;
}

export function columnFixed() {
  class DemoColumnFixed extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="column fixed datagrid demo" style="--body-height: 360px">
          <cds-grid-column width="150px" position="fixed">Host</cds-grid-column>
          <cds-grid-column width="350px">Status</cds-grid-column>
          <cds-grid-column width="500px">CPU</cds-grid-column>
          <cds-grid-column width="150px" position="fixed">Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-column-fixed', DemoColumnFixed);
  return html`<demo-grid-column-fixed></demo-grid-column-fixed>`;
}

export function columnFixedDynamic() {
  class DemoColumnFixedDyanmic extends LitElement {
    @state() private data = getVMData();
    @state() private pinFirst = true;
    @state() private pinLast = true;

    render() {
      return html`
        <cds-grid aria-label="columns fixed dynamic datagrid demo" style="--body-height: 360px">
          <cds-grid-column width="200px" resizable .position=${this.pinFirst ? 'fixed' : 'initial'}>
            Host <cds-action @click=${() => (this.pinFirst = !this.pinFirst)} .status=${this.pinFirst ? 'active' : ''} shape="pin" aria-label="pin host column"></cds-action>
          </cds-grid-column>
          <cds-grid-column width="400px" resizable>Status</cds-grid-column>
          <cds-grid-column width="1000px" resizable>CPU</cds-grid-column>
          <cds-grid-column width="200px" resizable .position=${this.pinLast ? 'fixed' : 'initial'}>
            Memory <cds-action @click=${() => (this.pinLast = !this.pinLast)} .status=${this.pinLast ? 'active' : ''} shape="pin" aria-label="pin memory column"></cds-action>
          </cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-column-fixed-dynamic', DemoColumnFixedDyanmic);
  return html`<demo-column-fixed-dynamic></demo-column-fixed-dynamic>`;
}

export function columnMultiFixed() {
  class DemoColumnMultiFixed extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
      <cds-grid aria-label="column multi fixed datagrid demo" style="--body-height: 360px">
        <cds-grid-column width="150px" position="fixed">Host</cds-grid-column>
        <cds-grid-column width="150px" position="fixed">Status</cds-grid-column>
        <cds-grid-column width="500px">CPU</cds-grid-column>
        <cds-grid-column width="500px">Memory</cds-grid-column>
        ${this.data.map(entry => html`
        <cds-grid-row>
          <cds-grid-cell>${entry.id}</cds-grid-cell>
          <cds-grid-cell>${entry.status}</cds-grid-cell>
          <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
          <cds-grid-cell>${entry.memory}%</cds-grid-cell>
        </cds-grid-row>`)}
        <cds-grid-footer></cds-grid-footer>
      </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-column-multi-fixed', DemoColumnMultiFixed);
  return html`<demo-grid-column-multi-fixed></demo-grid-column-multi-fixed>`;
}

export function columnSticky() {
  class DemoColumnSticky extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="column sticky datagrid demo" style="--body-height: 360px">
          <cds-grid-column width="200px">Host</cds-grid-column>
          <cds-grid-column width="200px" position="sticky">Status</cds-grid-column>
          <cds-grid-column width="1000px">CPU</cds-grid-column>
          <cds-grid-column width="1000px">Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-column-sticky', DemoColumnSticky);
  return html`<demo-grid-column-sticky></demo-grid-column-sticky>`;
}

export function cellEditable() {
  class DemoCellEditable extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="cell editable datagrid demo" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell aria-readonly="true">${entry.id}</cds-grid-cell>
            <cds-grid-cell @keyup=${(e: any) => this.toggleEdit(e, entry)} @dblclick=${(e: any) => this.toggleEdit(e, entry)}>
              <cds-input>
                <input ?readonly=${!entry.selected} class="${entry.id}-input" type="text" .value=${entry.about} aria-label="${entry.id} about cell" @change=${(e: any) => entry.about = e.target.value} />
              </cds-input>
            </cds-grid-cell>
            <cds-grid-cell aria-readonly="true">${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell aria-readonly="true">${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }

    private toggleEdit(e: any, entry: TestVM) {
      if (!entry.selected && (e.code === 'Enter' || e.type === 'dblclick')) {
        entry.selected = true;
        this.data = [...this.data];
        e.target.querySelector('input')?.focus();
      } else if (entry.selected && (e.code === 'Enter' || e.code === 'Escape' || e.type === 'blur')) {
        entry.selected = false;
        this.data = [...this.data];
        e.target.closest('cds-grid-cell').focus();
      }
    }
  }

  registerElementSafely('demo-grid-cell-editable', DemoCellEditable);
  return html`<demo-grid-cell-editable></demo-grid-cell-editable>`;
}

export function footerOptional() {
  class DemoFooterOptional extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="footer optional datagrid demo" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-footer-optional', DemoFooterOptional);
  return html`<demo-grid-footer-optional></demo-grid-footer-optional>`;
}

export function footer() {
  class DemoFooter extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="footer datagrid demo" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer>grid footer content</cds-grid-footer>
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-footer', DemoFooter);
  return html`<demo-grid-footer></demo-grid-footer>`;
}

export function compact() {
  class DemoCompact extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="compact datagrid demo" cds-theme="compact" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-compact', DemoCompact);
  return html`<demo-grid-compact></demo-grid-compact>`;
}

export function performance() {
  class DemoPerformance extends LitElement {
    @state() private showParseAndRender = false;
    @state() private hide = false;
    @state() private data: TestVM[] = [];
    @state() private numberOfRows = 1000;

    render() {
      return html`
        <section cds-layout="vertical gap:lg">
          <cds-input control-width="shrink">
            <label>Number of Rows</label>
            <input type="number" min="20" .value=${`${this.numberOfRows}`} @input=${(e: any) => this.setRows(parseInt(e.target.value))} />
          </cds-input>
          <br />
          <button @click=${this.toggleGrid}>Render Large Grid</button>
          <button @click=${this.toggleVisibility}>css visibility</button>
          <br /><br />
          ${this.showParseAndRender ? html`
          <cds-grid aria-label="performance datagrid demo" ?hidden=${this.hide} style="--body-height: 360px; width: 800px">
            <cds-grid-column>Host</cds-grid-column>
            <cds-grid-column>Status</cds-grid-column>
            <cds-grid-column>CPU</cds-grid-column>
            <cds-grid-column>Memory</cds-grid-column>
            ${this.data.map(entry => html`  
            <cds-grid-row>
              <cds-grid-cell>${entry.id}</cds-grid-cell>
              <cds-grid-cell>${entry.status}</cds-grid-cell>
              <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
              <cds-grid-cell>${entry.memory}%</cds-grid-cell>
            </cds-grid-row>`)}
            <cds-grid-footer>
              <p style="margin: 0; line-height: 0">${this.data.length} Rows ${this.data.length * 4} Cells</p>
            </cds-grid-footer>
          </cds-grid>` : ''}
        </section>`;
    }

    connectedCallback() {
      super.connectedCallback();
      this.setRows(1000);
    }

    private toggleGrid() {
      this.showParseAndRender = !this.showParseAndRender;
      this.hide = !this.showParseAndRender;
    }

    private toggleVisibility() {
      if (this.showParseAndRender) {
        this.hide = !this.hide;
      }
    }

    private setRows(numberOfRows: number) {
      this.showParseAndRender = false;
      this.numberOfRows = numberOfRows;
      const data: any[] = [];

      for (let i = 0; i < (this.numberOfRows / 20); i++) {
        data.push(
          ...getVMData().map(e => {
            e.id = `${e.id}${i === 0 ? '' : `-${i}`}`;
            return e;
          })
        );
      }

      this.data = data;
    }
  }

  registerElementSafely('demo-grid-performance', DemoPerformance);
  return html`<demo-grid-performance></demo-grid-performance>`;
}

export function rowDraggable() {
  class DemoRowDraggable extends LitElement {
    @state() private data = getVMData();
    @state() private ariaLiveMessage = '';

    render() {
      return html`
        <cds-grid aria-label="row draggable datagrid demo" @cdsDraggableChange=${this.sortList} style="--body-height: 360px">
          <cds-grid-column type="action" aria-label="draggable action column"></cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row draggable="true" id=${entry.id}>
            <cds-grid-cell type="action">
              <cds-action-handle aria-label="sort ${entry.id} row"></cds-action-handle>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-placeholder draggable="false">&nbsp;</cds-grid-placeholder>
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        <p>aria-live:</p>
        <div aria-live="assertive" role="log" aria-atomic="true">${this.ariaLiveMessage}</div>`;
    }

    private sortList(e: any) {
      if (e.detail.type === 'drop') {
        this.data = [...swapItems(e.detail.target, e.detail.from, this.data)] as TestVM[];
        this.ariaLiveMessage = `host ${e.detail.from.id} dropped at row ${this.data.findIndex(i => i.id === e.detail.target.id) + 1}`;
      } else if (e.detail.type === 'dragstart') {
        this.ariaLiveMessage = `host ${e.detail.from.id} grabbed`;
      }
    }
  }

  registerElementSafely('demo-grid-row-draggable', DemoRowDraggable);
  return html`<demo-grid-row-draggable></demo-grid-row-draggable>`;
}

export function columnDraggable() {
  class DemoColumnDraggable extends LitElement {
    @state() private data = getVMData();
    @state() private columns = [{ label: 'Host', key: 'id' }, { label: 'Status', key: 'status' }, { label: 'CPU', key: 'cpu'}, { label: 'Memory', key: 'memory' }];
    @state() private ariaLiveMessage = '';

    render() {
      return html`
        <cds-grid aria-label="column draggable datagrid demo" @cdsDraggableChange=${this.sortColumns} style="--body-height: 360px">
          ${this.columns.map(c => html`
            <cds-grid-column draggable="true" column-key="${c.key}">
              ${c.label} <cds-action-handle aria-label="sort ${c.label} column"></cds-action-handle>
            </cds-grid-column>`)}
          ${this.data.map((entry: any) => html`
            <cds-grid-row id=${entry.id}>
              ${this.columns.map(c => html`<cds-grid-cell>${entry[c.key]}</cds-grid-cell>`)}
            </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        <p>aria-live:</p>
        <div aria-live="assertive" role="log" aria-atomic="true">${this.ariaLiveMessage}</div>`;
    }

    private sortColumns(e: any) {
      if (e.detail.type === 'drop') {
        const targetIndex = parseInt(e.detail.target.getAttribute('aria-colindex')) - 1;
        const fromIndex = parseInt(e.detail.from.getAttribute('aria-colindex')) - 1;
        const items = [...this.columns];
        const item = items.splice(fromIndex, 1)[0];
        items.splice(targetIndex, 0, item);
        this.columns = [...items];
        this.ariaLiveMessage = `${e.detail.from.textContent} dropped at column ${e.detail.target.getAttribute('aria-colindex')}`;
      } else if (e.detail.type === 'dragstart') {
        this.ariaLiveMessage = `${e.detail.from.textContent} column grabbed`;
      }
    }
  }

  registerElementSafely('demo-grid-column-draggable', DemoColumnDraggable);
  return html`<demo-grid-column-draggable></demo-grid-column-draggable>`;
}

export function rowSwappable() {
  class DemoRowSwappable extends LitElement {
    @state() private listOne = getVMData().slice(0, 3);
    @state() private listTwo = getVMData().slice(4, 7);
    @state() private selectedEntryId: string;
    @state() private ariaLiveMessage = '';
    @state() private dropdownAnchor: HTMLElement;

    render() {
      return html`
        <cds-grid aria-label="production VMs" @cdsDraggableChange=${this.sortOne} style="--body-height: 360px">
          <cds-grid-column type="action" aria-label="draggable action column"></cds-grid-column>
          <cds-grid-column>Production Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          ${this.listOne.map(entry => html`
          <cds-grid-row id=${entry.id} draggable="true">
            <cds-grid-cell type="action">
              <cds-action-handle aria-label="sort ${entry.id} row" @click=${(e: any) => this.selectEntry(entry, e.target)}></cds-action-handle>
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

        <cds-grid aria-label="staging VMs" @cdsDraggableChange=${this.sortTwo} style="--body-height: 360px">
          <cds-grid-column type="action" aria-label="draggable action column"></cds-grid-column>
          <cds-grid-column>Staging Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          ${this.listTwo.map(entry => html`
          <cds-grid-row id=${entry.id} draggable="true">
            <cds-grid-cell type="action">
              <cds-action-handle aria-label="sort ${entry.id} row" @click=${(e: any) => this.selectEntry(entry, e.target)}></cds-action-handle>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-placeholder draggable="false">Staging Environment</cds-grid-placeholder>
          <cds-grid-footer>List Two: ${this.listTwo.map(j => html`${j.id} `)}</cds-grid-footer>
        </cds-grid>
        <cds-dropdown ?hidden=${!this.selectedEntryId} .anchor=${this.dropdownAnchor} @closeChange=${() => (this.dropdownAnchor = null) as any}>
          <cds-button @click=${this.appendToOtherGrid} action="flat" size="sm">Move to <span>${this.listOne.find(i => i.id === this.selectedEntryId) ? 'Staging' : 'Production'}</span></cds-button>
        </cds-dropdown>`;
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
      if (e.detail.type === 'drop') {
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
      if (e.detail.type === 'drop') {
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
      if (e.detail.type === 'drop') {
        const listOneIndex = this.listOne.findIndex(i => i.id === e.detail.target.id);
        const listTwoIndex = this.listTwo.findIndex(i => i.id === e.detail.target.id);
        this.ariaLiveMessage = `host ${e.detail.from.id} dropped at row ${(listOneIndex !== -1 ? listOneIndex : listTwoIndex) + 1} ${listOneIndex !== -1 ? 'production' : 'staging'}`;
      } else if (e.detail.type === 'dragstart') {
        this.ariaLiveMessage = `host ${e.detail.from.id} grabbed`;
      }
    }
  }

  registerElementSafely('demo-grid-row-swappable', DemoRowSwappable);
  return html`<demo-grid-row-swappable></demo-grid-row-swappable>`;
}

export function rowHeight() {
  class DemoRowHeight extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="row height datagrid demo" style="--row-height: 48px; --column-height: 48px; --body-height: 420px;">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-row-height', DemoRowHeight);
  return html`<demo-grid-row-height></demo-grid-row-height>`;
}

export function noScroll() {
  class DemoNoScroll extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="no scroll datagrid demo">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-no-scroll', DemoNoScroll);
  return html`<demo-grid-no-scroll></demo-grid-no-scroll>`;
}

export function rowFixed() {
  class DemoRowFixed extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="row fixed datagrid demo" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map((entry, i) => html`
          <cds-grid-row .position=${i === 0 ? 'fixed' : null}>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-row-fixed', DemoRowFixed);
  return html`<demo-grid-row-fixed></demo-grid-row-fixed>`;
}

export function rowSticky() {
  class DemoRowSticky extends LitElement {
    @state() private data = [...getVMData(), ...getVMData()];

    render() {
      return html`
        <cds-grid aria-label="row sticky datagrid demo" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map((entry, i) => html`
          <cds-grid-row .position=${i !== 0 && !(i % 5) ? 'sticky' : null}>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-row-sticky', DemoRowSticky);
  return html`<demo-grid-row-sticky></demo-grid-row-sticky>`;
}

export function rangeSelect() {
  class DemoSelectableCells extends LitElement {
    @state() private data = getVMData();
    @state() private activeCells: CdsGridCell[] = [];

    render() {
      return html`
        <cds-grid aria-label="range selection datagrid demo" @rangeSelectionChange=${(e: any) => this.activeCells = e.detail} style="--body-height: 490px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`  
          <cds-grid-row id=${entry.id}>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer>
            <p cds-text="body">
              <strong>CPU:</strong>
              ${(this.activeCells.filter(c => c.colIndex === 3).reduce((prev, cell) => prev + this.data.find(i => i.id === cell.parentElement.id).cpu, 0) / (this.activeCells.length ? this.activeCells.length : 1)).toFixed(2)}%
              <strong>Memory:</strong>
              ${(this.activeCells.filter(c => c.colIndex === 4).reduce((prev, cell) => prev + this.data.find(i => i.id === cell.parentElement.id).memory, 0) / (this.activeCells.length ? this.activeCells.length : 1)).toFixed(2)}%
            </p>
          </cds-grid-footer>
        </cds-grid>
        <p cds-text="body">Active Cells: ${this.activeCells.map(c => html`(${c.colIndex},${c.rowIndex}) `)}</p>
      `;
    }
  }

  registerElementSafely('demo-grid-selectable-cells', DemoSelectableCells);
  return html`<demo-grid-selectable-cells></demo-grid-selectable-cells>`;
}

export function rangeSelectContextMenu() {
  class DemoRangeSelectContextMenu extends LitElement {
    @state() private rows = getVMData();
    @state() private columns = [{ label: 'Host', key: 'id' }, { label: 'Status', key: 'status' }, { label: 'CPU', key: 'cpu' }, { label: 'Memory', key: 'memory' }];
    @state() private activeCells: CdsGridCell[] = [];
    @state() private anchor?: HTMLElement = null;
    @state() private csv: string;

    render() {
      return html`
        <cds-grid aria-label="range select context menu datagrid demo" @rangeSelectionChange=${(e: any) => this.activeCells = e.detail} style="--body-height: 490px">
          ${this.columns.map(c => html`<cds-grid-column>${c.label}</cds-grid-column>`)}
          ${this.rows.map(entry => html`  
          <cds-grid-row id=${entry.id}>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        ${this.anchor ? html`
        <cds-dropdown .anchor=${this.anchor} @closeChange=${() => (this.anchor = null) as void}>
          <cds-button action="flat" size="sm" @click=${() => this.exportToCSV()}>Export to CSV</cds-button>
          <cds-button action="flat" size="sm" @click=${() => this.logCSV()}>Log CSV</cds-button>
        </cds-dropdown>` : ''}
        <pre cds-text="body">${this.csv}</pre>
      `;
    }

    connectedCallback() {
      super.connectedCallback();
      window.addEventListener('contextmenu', (e: any) => {
        const cell = e.path.find((e: any) => e.tagName === 'CDS-GRID-CELL');
        if (this.activeCells.length && cell?.active && e.target === this) {
          e.preventDefault();
          this.anchor = cell;
        }
      });
    }

    private logCSV() {
      const columns = Array.from(new Set(this.activeCells.map(c => c.colIndex - 1))).map(i => this.columns[i].label);
      const rows = groupArray(this.activeCells.map(c => (this.rows[c.rowIndex - 1] as any)[this.columns[c.colIndex - 1].key]), columns.length).map(c => c.join(',')).join('\n');
      this.csv = `${columns.join(',')}\n${rows}`;
      this.anchor = null;
      // setTimeout(() => this.shadowRoot.querySelector<HTMLElement>(`cds-grid-cell[tabindex='0']`).focus());
    }

    private exportToCSV() {
      this.logCSV();
      const a = document.createElement('a');
      a.href = `data:application/octet-stream,${encodeURIComponent(this.csv)}`;
      a.download = 'download.csv';
      a.click();
    }
  }

  registerElementSafely('demo-range-select-context-menu', DemoRangeSelectContextMenu);
  return html`<demo-range-select-context-menu></demo-range-select-context-menu>`;
}

export function borderCell() {
  class DemoBorderCell extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="border cell datagrid demo" border="cell" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-border-cell', DemoBorderCell);
  return html`<demo-grid-border-cell></demo-grid-border-cell>`;
}

export function borderColumn() {
  class DemoBorderColumn extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="border column datagrid demo" border="column" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-border-column', DemoBorderColumn);
  return html`<demo-grid-border-column></demo-grid-border-column>`;
}

export function borderNone() {
  class DemoBorderNone extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="border none datagrid demo" border="none" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-border-none', DemoBorderNone);
  return html`<demo-grid-border-none></demo-grid-border-none>`;
}

export function borderStripe() {
  class DemoBorderStripe extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="border stripe datagrid demo" border="stripe" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-border-stripe', DemoBorderStripe);
  return html`<demo-grid-border-stripe></demo-grid-border-stripe>`;
}

export function rowHeader() {
  class DemoRowHeader extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid  aria-label="row header datagrid demo" style="--body-height: 360px;">
          <cds-grid-column width="120px">Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell role="rowheader">${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-row-header', DemoRowHeader);
  return html`<demo-grid-row-header></demo-grid-row-header>`;
}

export function asyncData() {
  class DemoGridAsyncData extends LitElement {
    @state() private data: TestVM[] = [];

    render() {
      return html`
        <cds-grid aria-label="async loading datagrid demo" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          ${this.data.length === 0 ? html`
            <cds-grid-placeholder>
              <cds-progress-circle size="xl" status="info"></cds-progress-circle>
              <p cds-text="subsection">Loading VMs</p>
            </cds-grid-placeholder>
          ` : ''}
          <cds-grid-footer>
            <cds-inline-button @click=${() => this.load()}>Reload Data</cds-inline-button>
          </cds-grid-footer>
        </cds-grid>`;
    }

    firstUpdated(props: PropertyValues) {
      super.firstUpdated(props);
      this.load();
    }

    private async load() {
      this.data = [];
      this.data = await getVMDataAsync(2000);
    }
  }

  registerElementSafely('demo-grid-async-data', DemoGridAsyncData);
  return html`<demo-grid-async-data></demo-grid-async-data>`;
}

export function columnAlignCenter() {
  class DemoColumnAlignCenter extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid column-align="center" aria-label="column align center datagrid demo" style="--body-height: 360px;">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }
  }

  registerElementSafely('demo-grid-column-align-center', DemoColumnAlignCenter);
  return html`<demo-grid-column-align-center></demo-grid-column-align-center>`;
}

export function columnAlignRight() {
  class DemoColumnAlignRight extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid column-align="right" aria-label="column align right datagrid demo" style="--body-height: 360px;">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell><p cds-text="monospace">${entry.cpu.toFixed(2)}%</p></cds-grid-cell>
            <cds-grid-cell><p cds-text="monospace">${entry.memory.toFixed(2)}%</p></cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`;
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-column-align-right', DemoColumnAlignRight);
  return html`<demo-grid-column-align-right></demo-grid-column-align-right>`;
}

export function dropdownTest() {
  class DemoDropdown extends LitElement {
    @query('cds-button') anchor: HTMLElement;
    @state() showDropdown = false;

    render() {
      return html`
        <div cds-layout="p:lg">
          <cds-button
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="action-1"  
            @click=${() => this.showDropdown = true}>open</cds-button>

          ${this.showDropdown ? html`
          <cds-dropdown .anchor=${this.anchor} @closeChange=${() => this.showDropdown = false}>
            <button>Save</button>
            <button>Load</button>
            <cds-divider></cds-divider>
            <button>Export</button>
            <a href="#">Exit</a>
          </cds-dropdown>` : ''}
        </div>`;
    }
  }

  registerElementSafely('demo-dropdown', DemoDropdown);
  return html`<demo-dropdown></demo-dropdown>`;
}