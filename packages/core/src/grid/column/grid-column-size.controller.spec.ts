/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement } from 'lit';
import { query } from 'lit/decorators/query.js';
import { customElement } from '@cds/core/internal';
// import { CdsActionResize } from '@cds/core/actions';
import { createTestElement, removeTestElement, componentIsStable } from '@cds/core/test';
// import { GridColumnSizeController } from './grid-column-size.controller.js';
import '@cds/core/grid/register.js';
import { CdsGrid, CdsGridColumn, CdsGridCell } from '@cds/core/grid';

describe('grid-column-size.controller', () => {
  let element: HTMLElement;
  let grid: CdsGrid;
  let columns: NodeListOf<CdsGridColumn>;
  let cells: NodeListOf<CdsGridCell>;

  beforeEach(async () => {
    element = await createTestElement(
      html` <cds-grid style="width: 500px">
        <cds-grid-column type="action">...</cds-grid-column>
        <cds-grid-column resizable>Column 1</cds-grid-column>
        <cds-grid-column resizable>Column 2</cds-grid-column>
        <cds-grid-row>
          <cds-grid-cell>Cell 1</cds-grid-cell>
          <cds-grid-cell>Cell 2</cds-grid-cell>
        </cds-grid-row>
        <cds-grid-row>
          <cds-grid-cell>Cell 2-1</cds-grid-cell>
          <cds-grid-cell>Cell 2-2</cds-grid-cell>
        </cds-grid-row>
      </cds-grid>`
    );
    grid = element.querySelector<CdsGrid>('cds-grid');
    columns = element.querySelectorAll<CdsGridColumn>('cds-grid-column');
    cells = element.querySelectorAll<CdsGridCell>('cds-grid-cell');
    grid.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); // trigger initialization
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should lock width to 36px and 0 padding when column is of type action', async () => {
    await componentIsStable(columns[0]);
    expect(grid.style.getPropertyValue('--ch1')).toBe('36px');
    expect(getComputedStyle(columns[0]).getPropertyValue('--padding-block').trim()).toBe('0');

    await componentIsStable(cells[0]);
    expect(getComputedStyle(cells[0]).getPropertyValue('--padding-block').trim()).toBe('0');
  });

  it('should set CSS Custom Property for column custom width values', async () => {
    columns[0].width = '200px';
    await componentIsStable(columns[0]);
    expect(grid.style.getPropertyValue('--ch1')).toBe('200px');
  });

  it('should allow numeric width', async () => {
    columns[2].width = '200';
    await componentIsStable(columns[2]);
    expect(grid.style.getPropertyValue('--ch3')).toBe('200px');
  });

  it('should resize a column when resizeChange occurs', async () => {
    await componentIsStable(grid);
    await componentIsStable(columns[1]);
    columns[1].shadowRoot.dispatchEvent(new CustomEvent('resizeChange', { detail: -10, bubbles: true }));
    await componentIsStable(columns[0]);
    expect(grid.style.getPropertyValue('--ch2')).toBe('488px');
  });
});
