/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement, css } from 'lit';
import pipe from 'ramda/es/pipe.js';
import { registerElementSafely, state } from '@cds/core/internal';
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
import { paginate, filter, sortStrings, sortList, getVMData, TestVM, StatusDisplayType, StatusIconType, getVMOrderPreference, groupArray } from './storybook.js';

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
        <h2 cds-text="section">Flex Column Width</h2>
        ${flexColumnWidth()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Column Overflow</h2>
        ${columnOverflow()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Fixed Column Width</h2>
        ${fixedColumnWidth()}
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
        <h2 cds-text="section">Detail View</h2>
        ${detailView()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Single Select</h2>
        ${singleSelect()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Multi Select</h2>
        ${multiSelect()}
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
        <h2 cds-text="section">Single Action</h2>
        ${singleAction()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Multi Action</h2>
        ${multiAction()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Sortable Rows</h2>
        ${sortableRows()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Multi Sortable Rows</h2>
        ${multiSortableRows()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Row Filtering</h2>
        ${rowFiltering()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Multi Cell Filtering</h2>
        ${multiCellFiltering()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Fixed Columns</h2>
        ${fixedColumns()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Dynamic Fixed Columns</h2>
        ${dynamicFixedColumns()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Multi Fixed Columns</h2>
        ${multiFixedColumns()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Sticky Columns</h2>
        ${stickyColumns()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Editable Cell</h2>
        ${editableCell()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">RTL Support</h2>
        ${rtl()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Optional Footer</h2>
        ${optionalFooter()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Compact</h2>
        ${compact()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Draggable Rows</h2>
        ${draggableRows()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Swappable Rows</h2>
        ${swappableRows()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Draggable Columns</h2>
        ${draggableColumns()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Fixed Rows</h2>
        ${fixedRows()}
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
        <h2 cds-text="section">Range Select</h2>
        ${noScroll()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">Range Select</h2>
        ${rangeSelect()}
      </div>
      <div cds-layout="vertical gap:lg">Range Select Context Menu</h2>
        ${rangeSelectContextMenu()}
      </div>
      <div cds-layout="vertical gap:lg">
        <h2 cds-text="section">No Scroll</h2>
        ${noScroll()}
      </div>
    </section>
  `;
}

export function basic() {
  return html`
    <cds-grid aria-label="basic datagrid demo" style="--body-height: 360px">
      <cds-grid-column>Host</cds-grid-column>
      <cds-grid-column>Status</cds-grid-column>
      <cds-grid-column>CPU</cds-grid-column>
      <cds-grid-column>Memory</cds-grid-column>
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
    <cds-grid aria-label="keyboard navigation datagrid demo">
      <cds-grid-column width="200">Key</cds-grid-column>
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
  return html`
    <cds-grid cds-theme="dark" aria-label="dark theme datagrid demo" style="--body-height: 360px">
      <cds-grid-column>Host</cds-grid-column>
      <cds-grid-column>Status</cds-grid-column>
      <cds-grid-column>CPU</cds-grid-column>
      <cds-grid-column>Memory</cds-grid-column>

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

export function columnResize() {
  return html`
    <cds-grid aria-label="column resize datagrid demo" style="--body-height: 360px">
      <cds-grid-column resizable>Host</cds-grid-column>
      <cds-grid-column resizable>Status</cds-grid-column>
      <cds-grid-column resizable>CPU</cds-grid-column>
      <cds-grid-column>Memory</cds-grid-column>

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

export function flexColumnWidth() {
  return html`
    <cds-grid aria-label="flex column width datagrid demo" column-layout="flex" style="--body-height: 360px">
      <cds-grid-column resizable>Host</cds-grid-column>
      <cds-grid-column resizable>Status</cds-grid-column>
      <cds-grid-column resizable>CPU</cds-grid-column>
      <cds-grid-column resizable>Memory</cds-grid-column>
      <cds-grid-row>
        <cds-grid-cell>vm-host-001</cds-grid-cell>
        <cds-grid-cell>online</cds-grid-cell>
        <cds-grid-cell><p cds-text="truncate">25.00000001%</p></cds-grid-cell>
        <cds-grid-cell><p cds-text="truncate">50.00000005%</p></cds-grid-cell>
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

export function fixedColumnWidth() {
  return html`
    <cds-grid aria-label="fixed column width datagrid demo" style="--body-height: 360px">
      <cds-grid-column width="150">Host</cds-grid-column>
      <cds-grid-column width="150">Status</cds-grid-column>
      <cds-grid-column>CPU</cds-grid-column>
      <cds-grid-column>Memory</cds-grid-column>
      <cds-grid-row>
        <cds-grid-cell>vm-host-001</cds-grid-cell>
        <cds-grid-cell>online</cds-grid-cell>
        <cds-grid-cell>25%</p></cds-grid-cell>
        <cds-grid-cell>50%</p></cds-grid-cell>
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

export function columnOverflow() {
  return html`
    <cds-grid aria-label="fixed column width datagrid demo" style="--body-height: 360px">
      <cds-grid-column>Host</cds-grid-column>
      <cds-grid-column>Status</cds-grid-column>
      <cds-grid-column width="100">CPU</cds-grid-column>
      <cds-grid-column width="100">Memory</cds-grid-column>
      <cds-grid-row>
        <cds-grid-cell>vm-host-001</cds-grid-cell>
        <cds-grid-cell>online</cds-grid-cell>
        <cds-grid-cell><p cds-text="truncate">25.00000001%</p></cds-grid-cell>
        <cds-grid-cell><p cds-text="truncate">50.00000005%</p></cds-grid-cell>
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

export function rtl() {
  class DemoRtl extends LitElement {
    @state() private data = getVMData();
    @state() private currentDetail: any = null;

    render() {
      return html`
        <cds-grid aria-label="rtl datagrid demo" dir="rtl" style="--body-height: 360px">
          <cds-grid-column width="60"></cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>
              <cds-action-expand .expanded=${this.currentDetail?.id === entry.id} id="${entry.id}-detail-demo" @click=${() => this.showDetail(entry.id)}></cds-action-expand>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
          <cds-grid-detail ?hidden=${!this.currentDetail} anchor="${this.currentDetail?.id}-detail-demo" @closeChange=${this.closeDetail} dir="rtl">
            <h2>Host: ${this.currentDetail?.id}</h2>
            <p>Status: ${this.currentDetail?.status}</p>
            <p>CPU: ${this.currentDetail?.cpu}%</p>
            <p>Memory: ${this.currentDetail?.memory}%</p>
          </cds-grid-detail>
        </cds-grid>
      `;
    }

    private showDetail(id: string) {
      this.currentDetail = id !== this.currentDetail?.id ? this.data.find(i => i.id === id) : null;
    }

    private closeDetail() {
      this.currentDetail = null;
    }
  }

  registerElementSafely('demo-grid-rtl', DemoRtl);
  return html`<demo-grid-rtl></demo-grid-rtl>`;
}

export function responsive() {
  return html`
    <cds-grid aria-label="responsive datagrid demo" style="width: 340px; --body-height: 420px">
      <cds-grid-column position="fixed" width="120">Host</cds-grid-column>
      <cds-grid-column width="200">Status</cds-grid-column>
      <cds-grid-column width="200">CPU</cds-grid-column>
      <cds-grid-column width="200">Memory</cds-grid-column>

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

export function placeholder() {
  return html`
    <cds-grid aria-label="placeholder datagrid demo" style="--body-height: 360px">
      <cds-grid-column>Host</cds-grid-column>
      <cds-grid-column>Status</cds-grid-column>
      <cds-grid-column>CPU</cds-grid-column>
      <cds-grid-column>Memory</cds-grid-column>
      <cds-grid-placeholder></cds-grid-placeholder>
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
    idFilterDropdownVisible: boolean,
    columnsDropdownVisible: boolean,
    selectedColumns: ColumnTypes
  }

  const initialState: GridState = {
    data: getVMData(),
    orderPreference: getVMOrderPreference(),
    selectedColumns: ColumnTypes.All,
    currentDetail: null,
    sortType: 'none',
    pageSize: 10,
    search: '',
    page: 0,
    idFilterDropdownVisible: false,
    columnsDropdownVisible: false,
  };

  class DemoKitchenSink extends LitElement {
    @state() private state: GridState = initialState;

    render() {
      return html`
        <cds-grid aria-label="Active VM Management" @cdsDraggableChange=${this.reorderList} style="--body-height: 360px">
          <cds-grid-column width="44" resizable="hidden">
            <cds-checkbox>
              <input type="checkbox" .checked=${!this.state.data.find(i => !i.selected)} @change=${(e: any) => this.selectAll(e)} aria-label="select all" />
            </cds-checkbox>
          </cds-grid-column>
          <cds-grid-column width="50"></cds-grid-column>
          <cds-grid-column resizable width="260">
            Host
            <cds-action id="id-filter" @click=${() => (this.state = { ...this.state, idFilterDropdownVisible: true })} aria-label="column filter options" shape="filter"></cds-action>
            <cds-dropdown ?hidden=${!this.state.idFilterDropdownVisible} @hiddenChange=${() => (this.state = { ...this.state, idFilterDropdownVisible: false })} anchor="#id-filter">
              <cds-input>
                <input type="text" placeholder="Search" aria-label="search rows" .value=${this.state.search} @input=${(e: any) => this.search(e.target.value)} />
              </cds-input>
            </cds-dropdown>
          </cds-grid-column>
          ${this.columnVisible(ColumnTypes.Status) ? html`
          <cds-grid-column resizable>
            Status <cds-action-sort .sort=${this.state.sortType} @sortChange=${(e: any) => this.setSortType(e.detail)}></cds-action-sort>
          </cds-grid-column>`: ''}
          ${this.columnVisible(ColumnTypes.CPU) ? html`<cds-grid-column resizable>CPU</cds-grid-column>`: ''}
          ${this.columnVisible(ColumnTypes.Memory) ? html`<cds-grid-column resizable>Memory</cds-grid-column>` : ''}
          ${this.currentPage.map(entry => html`
          <cds-grid-row .selected=${entry.selected} id=${entry.id} .draggable=${this.state.sortType === 'none'}>
            <cds-grid-cell>
              <cds-checkbox cds-draggable="handle">
                <input type="checkbox" .checked=${entry.selected} value=${entry.id} @click=${(e: any) => this.select(entry, e.target.checked)} aria-label="Select ${entry.id}" />
              </cds-checkbox>
            </cds-grid-cell>
            <cds-grid-cell>
              <cds-action-expand .expanded=${this.currentDetail?.id === entry.id} id="${entry.id}-detail" @click=${() => this.showDetail(entry.id)}></cds-action-expand>
            </cds-grid-cell>
            <cds-grid-cell>
              ${entry.id}
            </cds-grid-cell>
            ${this.columnVisible(ColumnTypes.Status) ? html`
              <cds-grid-cell>
                <cds-tag status=${StatusDisplayType[entry.status]} readonly><cds-icon shape=${StatusIconType[entry.status]} inner-offset=${entry.status === 'deactivated' ? 0 : 3 }></cds-icon> ${entry.status}</cds-tag>
              </cds-grid-cell>` : ''}
            ${this.columnVisible(ColumnTypes.CPU) ? html`
              <cds-grid-cell> 
                <p cds-text="body">${entry.cpu}%</p>
              </cds-grid-cell>` : ''}
            ${this.columnVisible(ColumnTypes.Memory) ? html`<cds-grid-cell>${entry.memory}%</cds-grid-cell>` : ''}
          </cds-grid-row>`)}
          <cds-grid-placeholder draggable="false">&nbsp;</cds-grid-placeholder>
          <cds-grid-footer>
            <cds-action id="toggle-columns" @click=${() => (this.state = { ...this.state, columnsDropdownVisible: true })} aria-label="filter column" shape="view-columns"></cds-action>
            <cds-dropdown ?hidden=${!this.state.columnsDropdownVisible} @hiddenChange=${() => (this.state = { ...this.state, columnsDropdownVisible: false })} anchor="#toggle-columns" position="top">
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
              <cds-button action="flat" @click=${() => (this.state = { ...this.state, selectedColumns: ColumnTypes.All })} ?disabled=${this.columnVisible(ColumnTypes.All)}>Select All</cds-button>
            </cds-dropdown>
            <cds-pagination>
              <span style="margin-right: auto;">${this.state.data.filter(i => i.selected).length} selected</span>
              <cds-select control-width="shrink">
                <select .value=${this.state.pageSize} @input=${this.setPageSize} aria-label="per page">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="25">25</option>
                </select>
              </cds-select>
              <cds-pagination-button ?disabled=${this.state.page === 0} action="first" @click=${this.firstPage} aria-label="go to first"></cds-pagination-button>
              <cds-pagination-button ?disabled=${this.state.page === 0} action="prev" @click=${this.prevPage} aria-label="go to previous"></cds-pagination-button>
              <cds-input cds-pagination-number>
                <input type="number" value="1" aria-label="current page" @input=${this.setPage} value=${this.state.page + 1} min="1" max=${this.pageCount} />
                <cds-control-message>/ ${this.pageCount}</cds-control-message>
              </cds-input>
              <cds-pagination-button ?disabled=${this.state.page === this.pageCount - 1} action="next" @click=${this.nextPage} aria-label="go to next"></cds-pagination-button>
              <cds-pagination-button ?disabled=${this.state.page === this.pageCount - 1} action="last" @click=${this.lastPage} aria-label="go to last"></cds-pagination-button>
            </cds-pagination>
          </cds-grid-footer>
          <cds-grid-detail ?hidden=${!this.currentDetail} anchor="${this.currentDetail?.id}-detail" @closeChange=${this.closeDetail}>
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
        <br />
        <section cds-layout="vertical gap:lg">
          <cds-button action="outline" @click=${this.resetState}>clear local storage</cds-button>
          <pre style="width: 100%; overflow: auto;">${JSON.stringify({ ...this.state, data: this.state.data.map(i => i.id).join(','), orderPreference: this.state.orderPreference.join(',') }, null, 2)}</pre>
        </section>
      `;
    }

    connectedCallback() {
      super.connectedCallback();
      this.state = JSON.parse(localStorage.getItem('CORE_KITCHEN_SINK_DEMO')) ?? this.state;
    }

    updated(props: Map<string, any>) {
      super.updated(props);
      localStorage.setItem('CORE_KITCHEN_SINK_DEMO', JSON.stringify({ ...this.state, idFilterDropdownVisible: false, columnsDropdownVisible: false }));
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

    private showDetail(id: string) {
      this.state = { ...this.state, currentDetail: id !== this.state.currentDetail ? this.state.data.find(i => i.id === id).id : null };
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
          .map(c => parseInt(c.value))
          .reduce((p, n) => p + n, 1)
      };
    }

    private columnVisible(value: any) {
      return parseInt(value) === (this.state.selectedColumns & parseInt(value));
    }

    private reorderList(e: any) {
      this.state = { ...this.state, orderPreference: sortList<TestVM>(e.detail.target, e.detail.from, this.state.orderPreference.map(id => ({ id }))).map(i => i.id) };
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
              <cds-pagination-button
                aria-label="go to first"
                ?disabled=${this.currentPage === 0}
                action="first"
                @click=${this.firstPage}
              ></cds-pagination-button>
              <cds-pagination-button
                aria-label="go to previous"
                ?disabled=${this.currentPage === 0}
                action="prev"
                @click=${this.prevPage}
              ></cds-pagination-button>
              <cds-input cds-pagination-number>
                <input
                  type="number"
                  value="1"
                  size="1"
                  aria-label="current page"
                  @input=${this.setPage}
                  .value=${this.currentPage + 1}
                  min="1"
                  max=${this.pageCount}
                />
                <cds-control-message>/ ${this.pageCount}</cds-control-message>
              </cds-input>
              <cds-pagination-button
                aria-label="go to next"
                ?disabled=${this.currentPage === this.pageCount - 1}
                action="next"
                @click=${this.nextPage}
              ></cds-pagination-button>
              <cds-pagination-button
                aria-label="go to last"
                ?disabled=${this.currentPage === this.pageCount - 1}
                action="last"
                @click=${this.lastPage}
              ></cds-pagination-button>
            </cds-pagination>
          </cds-grid-footer>
        </cds-grid>
      `;
    }

    connectedCallback() {
      super.connectedCallback();
      this.updateList();
    }

    updated(props: Map<string, any>) {
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
      let list = filter([...this.data], 'id', this.search);
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
    @state() private toggleColumns = false;
    @state() private selectedColumns = ColumnTypes.All;

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
            </cds-grid-row>
          `)}
          <cds-grid-footer>
            <cds-action id="toggle-columns" @click=${() => (this.toggleColumns = true)} aria-label="filter column" shape="view-columns"></cds-action>
            <cds-dropdown ?hidden=${!this.toggleColumns} @hiddenChange=${() => (this.toggleColumns = false)} anchor="#toggle-columns" position="top">
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
            </cds-dropdown>
          </cds-grid-footer>
        </cds-grid>
      `;
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

export function detailView() {
  class DemoDetailView extends LitElement {
    @state() private data = getVMData();
    @state() private currentDetail: any = null;

    render() {
      return html`
        <cds-grid aria-label="detail view datagrid demo" style="--body-height: 360px">
          <cds-grid-column width="50"></cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>
              <cds-action-expand .expanded=${this.currentDetail?.id === entry.id} id="${entry.id}-detail-demo" @click=${() => this.showDetail(entry.id)}></cds-action-expand>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
          <cds-grid-detail ?hidden=${!this.currentDetail} anchor="${this.currentDetail?.id}-detail-demo" @closeChange=${this.closeDetail}>
            <h2 cds-text="section">${this.currentDetail?.id}</h2>
            <p cds-text="body">Status: ${this.currentDetail?.status}</p>
            <p cds-text="body">CPU: ${this.currentDetail?.cpu}%</p>
            <p cds-text="body">Memory: ${this.currentDetail?.memory}%</p>
          </cds-grid-detail>
        </cds-grid>
      `;
    }

    private showDetail(id: string) {
      this.currentDetail = id !== this.currentDetail?.id ? this.data.find(i => i.id === id) : null;
    }

    private closeDetail() {
      this.currentDetail = null;
    }
  }

  registerElementSafely('demo-grid-detail-view', DemoDetailView);
  return html`<demo-grid-detail-view></demo-grid-detail-view>`;
}

export function singleSelect() {
  const selectableData = getVMData();
  selectableData[1].selected = true;

  class DemoSingleSelect extends LitElement {
    @state() private data = selectableData;

    @state() private selectedItem = selectableData[1];

    render() {
      return html`
        <cds-grid aria-label="single select datagrid demo" style="--body-height: 360px">
          <cds-grid-column width="50"></cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row .selected=${entry.selected}>
            <cds-grid-cell>
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

  registerElementSafely('demo-grid-single-select', DemoSingleSelect);
  return html`<demo-grid-single-select></demo-grid-single-select>`;
}

export function multiSelect() {
  const selectableData = getVMData()
  selectableData[1].selected = true;
  selectableData[3].selected = true;

  class DemoMultiSelect extends LitElement {
    @state() private data = selectableData;
    @state() private allSelected = false;

    render() {
      return html`
        <cds-grid aria-label="multi select datagrid demo" aria-multiselectable="true" style="--body-height: 360px">
          <cds-grid-column width="50">
            <cds-checkbox>
              <input type="checkbox" .checked=${this.allSelected} @change=${(e: any) => this.selectAll(e)} aria-label="select all hosts" />
            </cds-checkbox>
          </cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row .selected=${entry.selected}>
            <cds-grid-cell>
              <cds-checkbox>
                <input type="checkbox" .checked=${entry.selected} value=${entry.id} @click=${(e: any) => this.select(entry, e.target.checked)} aria-label="select host ${entry.id}" />
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

    private select(entry: TestVM, checked: boolean) {
      this.data.find(i => i.id === entry.id).selected = checked;
      this.allSelected = !this.data.find(i => !i.selected);
      this.data = [...this.data];
    }

    private selectAll(e: any) {
      this.allSelected = e.target.checked;
      this.data.forEach(i => (i.selected = e.target.checked));
      this.data = [...this.data];
    }
  }

  registerElementSafely('demo-grid-multi-select', DemoMultiSelect);
  return html`<demo-grid-multi-select></demo-grid-multi-select>`;
}

export function singleAction() {
  class DemoSingleAction extends LitElement {
    @state() private data = getVMData();
    @state() private selectedEntry: any = null;
    @state() private anchor: HTMLElement = null;

    render() {
      return html`
        <cds-grid aria-label="single action datagrid demo" style="--body-height: 360px">
          <cds-grid-column width="50"></cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row .select=${entry.selected}>
            <cds-grid-cell action>
              <cds-action id="${entry.id}-action" @click=${(e: any) => this.select(e, entry)} aria-label="choose available host actions"></cds-action>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        <cds-dropdown ?hidden=${!this.selectedEntry} .anchor=${this.anchor} @hiddenChange=${() => (this.selectedEntry = null) as any}>
          <cds-button @click=${() => this.shutdown(this.selectedEntry)} block action="flat" size="sm">Shutdown ${this.selectedEntry?.id}</cds-button>
          <cds-button @click=${() => this.restart(this.selectedEntry)} block action="flat" size="sm">Restart ${this.selectedEntry?.id}</cds-button>
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

  registerElementSafely('demo-grid-single-action', DemoSingleAction);
  return html`<demo-grid-single-action></demo-grid-single-action>`;
}

export function multiAction() {
  class DemoMultiAction extends LitElement {
    @state() private data = getVMData();
    @state() private openAction = false;
    @state() private get allSelected() {
      return !this.data.find(i => !i.selected);
    }

    render() {
      return html`
        <cds-grid aria-label="multi action datagrid demo" style="--body-height: 360px">
          <cds-grid-column width="100">
            <cds-checkbox>
              <input type="checkbox" .checked=${this.allSelected} @change=${(e: any) => this.selectAll(e)} aria-label="choose action for selected hosts" />
            </cds-checkbox>
            <cds-action id="multi-action" @click=${() => (this.openAction = true)} aria-label="filter column"></cds-action>
            <cds-dropdown ?hidden=${!this.openAction} anchor="#multi-action" @hiddenChange=${() => (this.openAction = false)}>
              <cds-button action="flat" block size="sm" @click=${() => this.action('Restart')}>Restart Selected</cds-button><br />
              <cds-button action="flat" block size="sm" @click=${() => this.action('Shutdown')}>Shutdown Selected</cds-button>
            </cds-dropdown>
          </cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row .selected=${entry.selected}>
            <cds-grid-cell>
              <cds-checkbox>
                <input type="checkbox" .checked=${entry.selected} value=${entry.id} @click=${(e: any) => this.select(entry, e.target.checked)} aria-label="select ${entry.id}" />
              </cds-checkbox>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
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
      this.openAction = false;
      this.data.forEach(i => (i.selected = false));
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-multi-action', DemoMultiAction);
  return html`<demo-grid-multi-action></demo-grid-multi-action>`;
}

export function sortableRows() {
  class DemoSortableRows extends LitElement {
    @state() private data = getVMData();
    @state() private filteredList: TestVM[] = [];
    @state() private sortType: 'none' | 'ascending' | 'descending' = 'none';

    render() {
      return html`
        <cds-grid aria-label="sortable rows datagrid demo" style="--body-height: 360px">
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

    updated(props: Map<string, any>) {
      super.updated(props);
      if (props.has('sortType') && props.get('sortType') !== this.sortType) {
        this.filteredList = sortStrings([...this.data], 'id', this.sortType);
      }
    }
  }

  registerElementSafely('demo-grid-sortable-rows', DemoSortableRows);
  return html`<demo-grid-sortable-rows></demo-grid-sortable-rows>`;
}

export function multiSortableRows() {
  class DemoMultiSortRows extends LitElement {
    @state() private data = getVMData();
    @state() private filteredList: TestVM[] = [];
    @state() private sortState: { [key: string]: 'none' | 'ascending' | 'descending' } = { id: 'none', status: 'none' };

    render() {
      return html`
        <cds-grid aria-label="multi sortable datagrid demo" style="--body-height: 360px">
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

    updated(props: Map<string, any>) {
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

  registerElementSafely('demo-grid-multi-sort-rows', DemoMultiSortRows);
  return html`<demo-grid-multi-sort-rows></demo-grid-multi-sort-rows>`;
}

export function rowFiltering() {
  class DemoFiltering extends LitElement {
    @state() private data = getVMData();
    @state() private filteredList: TestVM[] = [];
    @state() private search = '';
    @state() private anchor: HTMLElement = null

    render() {
      return html`
        <cds-grid aria-label="row filtering datagrid demo" style="--body-height: 360px">
          <cds-grid-column>
            Host
            <cds-action id="id-filter-demo" @click=${(e: any) => (this.anchor = e.target)} shape="filter" aria-label="search available stocks"></cds-action>
            <cds-dropdown ?hidden=${!this.anchor} @hiddenChange=${() => (this.anchor = null) as any} .anchor=${this.anchor}>
              <cds-input>
                <input type="text" aria-label="search hosts" placeholder="Search" @input=${(e: any) => (this.search = e.target.value)} />
              </cds-input>
            </cds-dropdown>
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

    updated(props: Map<string, any>) {
      super.updated(props);
      if (props.has('search') && props.get('search') !== this.search) {
        this.filteredList = filter([...this.data], 'id', this.search);
      }

      if (props.has('anchor') && props.get('anchor') !== this.anchor) {
        setTimeout(() => props.get('anchor')?.focus());
      }
    }
  }

  registerElementSafely('demo-grid-row-filtering', DemoFiltering);
  return html`<demo-grid-row-filtering></demo-grid-row-filtering>`;
}

export function multiCellFiltering() {
  class DemoFiltering extends LitElement {
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
          <cds-grid aria-label="multi cell filtering datagrid demo" style="--body-height: 360px">
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

    updated(props: Map<string, any>) {
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

  registerElementSafely('demo-grid-filter', DemoFiltering);
  return html`<demo-grid-filter></demo-grid-filter>`;
}

export function fixedColumns() {
  class DemoFixedColumns extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="fixed columns datagrid demo" style="--body-height: 360px">
          <cds-grid-column width="150" position="fixed">Host</cds-grid-column>
          <cds-grid-column width="350">Status</cds-grid-column>
          <cds-grid-column width="500">CPU</cds-grid-column>
          <cds-grid-column width="150" position="fixed">Memory</cds-grid-column>
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

    protected createRenderRoot() { // todo: shadow dom breaks fixed position here
      return this;
    }
  }

  registerElementSafely('demo-grid-fixed-cols', DemoFixedColumns);
  return html`<demo-grid-fixed-cols></demo-grid-fixed-cols>`;
}

export function dynamicFixedColumns() {
  class DemoDyanmicFixedColumns extends LitElement {
    @state() private data = getVMData();
    @state() private pinFirst = true;
    @state() private pinLast = true;

    render() {
      return html`
        <cds-grid aria-label="fixed columns datagrid demo" style="--body-height: 360px">
          <cds-grid-column width="200" resizable .position=${this.pinFirst ? 'fixed' : 'initial'}>
            Host
            <cds-action @click=${() => (this.pinFirst = !this.pinFirst)} aria-label="pin host column">
              <cds-icon shape="pin" ?solid=${this.pinFirst}></cds-icon>
            </cds-action>
          </cds-grid-column>
          <cds-grid-column width="400" resizable>Status</cds-grid-column>
          <cds-grid-column width="1000" resizable>CPU</cds-grid-column>
          <cds-grid-column width="200" resizable .position=${this.pinLast ? 'fixed' : 'initial'}>
            Memory
            <cds-action @click=${() => (this.pinLast = !this.pinLast)} aria-label="pin memory column">
              <cds-icon shape="pin" ?solid=${this.pinLast}></cds-icon>
            </cds-action>
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

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-dynamic-fixed-columns', DemoDyanmicFixedColumns);
  return html`<demo-dynamic-fixed-columns></demo-dynamic-fixed-columns>`;
}

export function multiFixedColumns() {
  class DemoMultiFixedColumns extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
      <cds-grid aria-label="fixed columns datagrid demo" style="--body-height: 360px">
        <cds-grid-column width="150" position="fixed">Host</cds-grid-column>
        <cds-grid-column width="150" position="fixed">Status</cds-grid-column>
        <cds-grid-column width="500">CPU</cds-grid-column>
        <cds-grid-column width="500">Memory</cds-grid-column>
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

    protected createRenderRoot() {
      return this; // todo: shadow dom breaks fixed position here
    }
  }

  registerElementSafely('demo-grid-multi-fixed-cols', DemoMultiFixedColumns);
  return html`<demo-grid-multi-fixed-cols></demo-grid-multi-fixed-cols>`;
}

export function stickyColumns() {
  class DemoColSticky extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="sticky columns datagrid demo" style="--body-height: 360px">
          <cds-grid-column width="200">Host</cds-grid-column>
          <cds-grid-column width="200" position="sticky">Status</cds-grid-column>
          <cds-grid-column width="1000">CPU</cds-grid-column>
          <cds-grid-column width="1000">Memory</cds-grid-column>
          ${this.data.map(entry => html`
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

    protected createRenderRoot() {
      return this; // todo: shadow dom breaks sticky position here
    }
  }

  registerElementSafely('demo-grid-col-sticky', DemoColSticky);
  return html`<demo-grid-col-sticky></demo-grid-col-sticky>`;
}

export function editableCell() {
  class DemoEditable extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="editable cell datagrid demo" style="--body-height: 360px">
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>
              ${entry.selected
                ? html`
                <cds-input>
                  <input class="${entry.id}-input" type="text" .value=${entry.about} @keyup=${(e: any) => this.updateEntry(e, entry)} aria-label="${entry.id} about cell" />
                </cds-input>`
                : html`
                <cds-action class="${entry.id}-button" @click=${() => this.editEntry(entry)} aria-label="edit ${entry.id} about cell" shape="pencil"></cds-action>
                <span>${entry.about}</span>`}
            </cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
      `;
    }

    private updateEntry(e: any, entry: any) {
      if (e.code === 'Enter' || e.code === 'Escape') {
        entry.about = e.target.value;
        entry.selected = false;
        this.data = [...this.data];
        setTimeout(() => this.shadowRoot.querySelector<HTMLElement>(`.${entry.id}-button`).focus());
      }
    }

    private editEntry(entry: any) {
      entry.selected = true;
      this.data = [...this.data];
      setTimeout(() => this.shadowRoot.querySelector<HTMLElement>(`.${entry.id}-input`).focus());
    }
  }

  registerElementSafely('demo-grid-editable', DemoEditable);
  return html`<demo-grid-editable></demo-grid-editable>`;
}

export function optionalFooter() {
  return html`
    <cds-grid aria-label="optional footer datagrid demo" style="--body-height: 360px">
      <cds-grid-column>Host</cds-grid-column>
      <cds-grid-column>Status</cds-grid-column>
      <cds-grid-column>CPU</cds-grid-column>
      <cds-grid-column>Memory</cds-grid-column>
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
    </cds-grid>
  `;
}

export function compact() {
  return html`<style>
      [cds-theme*='compact'] {
        --cds-global-space-0: 0;
        --cds-global-space-1: 1px;
        --cds-global-space-2: 2px;
        --cds-global-space-3: 3px;
        --cds-global-space-4: 4.5px;
        --cds-global-space-5: 6px;
        --cds-global-space-6: 9px;
        --cds-global-space-7: 12px;
        --cds-global-space-8: 13.5px;
        --cds-global-space-9: 18px;
        --cds-global-space-10: 24px;
        --cds-global-space-11: 27px;
        --cds-global-space-12: 36px;
        --cds-global-space-13: 54px;
      }
    </style>
    <cds-grid aria-label="compact datagrid demo" cds-theme="compact" style="--body-height: 360px">
      <cds-grid-column>Host</cds-grid-column>
      <cds-grid-column>Status</cds-grid-column>
      <cds-grid-column>CPU</cds-grid-column>
      <cds-grid-column>Memory</cds-grid-column>
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
    </cds-grid>`;
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
          <cds-button action="outline" @click=${this.toggleGrid}>Render Large Grid</cds-button>
          <cds-button action="outline" @click=${this.toggleVisibility}>css visibility</cds-button>
          <br /><br />
          ${this.showParseAndRender ? html`
          <cds-grid aria-label="performance datagrid demo" ?hidden=${this.hide} style="--body-height: 360px; max-width: 800px">
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
      let data: any[] = [];

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

export function draggableRows() {
  class DemoDraggableRows extends LitElement {
    @state() private data = getVMData();

    render() {
      return html`
        <cds-grid aria-label="draggable rows datagrid demo" @cdsDraggableChange=${this.sortList} style="--body-height: 360px">
          <cds-grid-column width="60"></cds-grid-column>
          <cds-grid-column>Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          ${this.data.map(entry => html`
          <cds-grid-row draggable="true" id=${entry.id}>
            <cds-grid-cell>
              <cds-action-handle aria-label="sort ${entry.id} row"></cds-action-handle>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
            <cds-grid-cell>${entry.cpu}%</cds-grid-cell>
            <cds-grid-cell>${entry.memory}%</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-placeholder draggable="false"></cds-grid-placeholder>
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        <br />
        ${this.data.map(entry => entry.id).join(', ')}`;
    }

    private sortList(e: any) {
      this.data = [...sortList(e.detail.target, e.detail.from, this.data)] as TestVM[];
    }
  }

  registerElementSafely('demo-grid-draggable-rows', DemoDraggableRows);
  return html`<demo-grid-draggable-rows></demo-grid-draggable-rows>`;
}

export function swappableRows() {
  class DemoSwappableRows extends LitElement {
    @state() private listOne = getVMData().slice(0, 3);

    @state() private listTwo = getVMData().slice(4, 7);

    @state() private selectedEntryId: string;

    render() {
      return html`
        <cds-grid aria-label="production VMs" @cdsDraggableChange=${this.sortOne} style="--body-height: 360px">
          <cds-grid-column width="60"></cds-grid-column>
          <cds-grid-column>Production Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          ${this.listOne.map(entry => html`
          <cds-grid-row id=${entry.id} draggable="true">
            <cds-grid-cell>
              <cds-action-handle aria-label="sort ${entry.id} row" id="selected-${entry.id}-action" @click=${() => this.selectedEntryId = entry.id}></cds-action-handle>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-placeholder draggable="false">Production Environment</cds-grid-placeholder>
          <cds-grid-footer>List One: ${this.listOne.map(i => html`${i.id} `)}</cds-grid-footer>
        </cds-grid>

        <br />

        <cds-grid aria-label="staging VMs" @cdsDraggableChange=${this.sortTwo} style="--body-height: 360px">
          <cds-grid-column width="60"></cds-grid-column>
          <cds-grid-column>Staging Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          ${this.listTwo.map(entry => html`
          <cds-grid-row id=${entry.id} draggable="true">
            <cds-grid-cell>
              <cds-action-handle aria-label="sort ${entry.id} row" id="selected-${entry.id}-action" @click=${() => this.selectedEntryId = entry.id}></cds-action-handle>
            </cds-grid-cell>
            <cds-grid-cell>${entry.id}</cds-grid-cell>
            <cds-grid-cell>${entry.status}</cds-grid-cell>
          </cds-grid-row>`)}
          <cds-grid-placeholder draggable="false">Staging Environment</cds-grid-placeholder>
          <cds-grid-footer>List Two: ${this.listTwo.map(j => html`${j.id} `)}</cds-grid-footer>
        </cds-grid>
        <cds-dropdown ?hidden=${!this.selectedEntryId} anchor="#selected-${this.selectedEntryId}-action" @hiddenChange=${() => (this.selectedEntryId = null) as any}>
          <cds-button @click=${this.appendToOtherGrid} block action="flat" size="sm">Move to <span>${this.listOne.find(i => i.id === this.selectedEntryId) ? 'Staging' : 'Production'}</span></cds-button>
        </cds-dropdown>`;
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
      setTimeout(() => (this.shadowRoot.querySelector(`#selected-${item.id}-action`) as any).focus(), 0);
    }

    private sortOne(e: any) {
      if (this.listOne.find(i => i.id === e.detail.from.id)) {
        this.listOne = sortList(e.detail.target, e.detail.from, this.listOne) as TestVM[];
      } else {
        const { fromList, targetList } = this.swap(this.listOne, this.listTwo, e.detail);
        this.listOne = targetList;
        this.listTwo = fromList;
      }
    }

    private sortTwo(e: any) {
      if (this.listTwo.find(i => i.id === e.detail.from.id)) {
        this.listTwo = sortList(e.detail.target, e.detail.from, this.listTwo) as TestVM[];
      } else {
        const { fromList, targetList } = this.swap(this.listTwo, this.listOne, e.detail);
        this.listTwo = targetList;
        this.listOne = fromList;
      }
    }

    private swap(targetList: any, fromList: any, detail: any) {
      const item = fromList.splice(fromList.indexOf(fromList.find(i => i.id === detail.from.id)), 1)[0];
      const targetIndex = targetList.indexOf(targetList.find(i => i.id === detail.target.id));
      targetIndex === -1 ? targetList.push(item) : targetList.splice(targetIndex, 0, item);
      return { targetList: [...targetList], fromList: [...fromList] };
    }
  }

  registerElementSafely('demo-grid-swappable-rows', DemoSwappableRows);
  return html`<demo-grid-swappable-rows></demo-grid-swappable-rows>`;
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

export function fixedRows() {
  return html`    
    <cds-grid aria-label="fixed row datagrid demo" style="--body-height: 360px">
    <cds-grid-column>Host</cds-grid-column>
      <cds-grid-column>Status</cds-grid-column>
      <cds-grid-column>CPU</cds-grid-column>
      <cds-grid-column>Memory</cds-grid-column>
      <cds-grid-row position="fixed">
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

export function draggableColumns() {
  class DemoDraggableColumns extends LitElement {
    @state() private data = getVMData().map(i => {
      i.selected = undefined;
      i.about = undefined;
      return i;
    });

    @state() private columns = [{ label: 'Host', key: 'id' }, { label: 'Status', key: 'status' }, { label: 'CPU', key: 'cpu'}, { label: 'Memory', key: 'memory' }];

    render() {
      return html`
        <cds-grid aria-label="draggable columns datagrid demo" @cdsDraggableChange=${this.sortColumns} style="--body-height: 360px">
          ${this.columns.map(c => html`
            <cds-grid-column draggable="true">
              ${c.label} <cds-action-handle aria-label="sort ${c.label} column"></cds-action-handle>
            </cds-grid-column>`)}
          ${this.data.map((entry: any) => html`
            <cds-grid-row id=${entry.id}>
              ${this.columns.map(c => html`<cds-grid-cell>${entry[c.key]}</cds-grid-cell>`)}
            </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
      `;
    }

    private sortColumns(e: any) {
      const targetIndex = parseInt(e.detail.target.getAttribute('aria-colindex')) - 1;
      const fromIndex = parseInt(e.detail.from.getAttribute('aria-colindex')) - 1;
      const items = [...this.columns];
      const item = items.splice(fromIndex, 1)[0];
      items.splice(targetIndex, 0, item);
      this.columns = [...items];
    }
  }

  registerElementSafely('demo-grid-draggable-columns', DemoDraggableColumns);
  return html`<demo-grid-draggable-columns></demo-grid-draggable-columns>`;
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
          <cds-dropdown ?hidden=${!this.anchor} .anchor=${this.anchor} @hiddenChange=${() => (this.anchor = null) as void}>
            <cds-button @click=${() => this.exportToCSV()} action="flat" block>Export to CSV</cds-button>
            <cds-button @click=${() => this.logCSV()} action="flat" block>Log CSV</cds-button>
          </cds-dropdown>
        </cds-grid>
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
      const rows = groupArray(this.activeCells.map(c => this.rows[c.rowIndex - 1][this.columns[c.colIndex - 1].key]), columns.length).map(c => c.join(',')).join('\n');
      this.csv = `${columns.join(',')}\n${rows}`;
      this.anchor = null;
      setTimeout(() => this.shadowRoot.querySelector<HTMLElement>(`cds-grid-cell[tabindex='0']`).focus());
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