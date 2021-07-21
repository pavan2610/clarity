/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html } from 'lit';
import { componentIsStable, createTestElement, removeTestElement } from '@cds/core/test';
import '@cds/core/grid/register.js';
import { CdsGridColumn } from './grid-column.element.js';
import { CdsGridCell } from '../cell/grid-cell.element.js';
import { CdsGrid } from '../grid/grid.element.js';

describe('grid-column-position.controller', () => {
  let grid: CdsGrid;
  let firstColumn: CdsGridColumn;
  let lastColumn: CdsGridColumn;
  let firstCell: CdsGridCell;
  let lastCell: CdsGridCell;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(html`
      <cds-grid>
        <cds-grid-column id="first-grid-column" position="fixed">Stock</cds-grid-column>
        <cds-grid-column id="second-grid-column" position="fixed">Average</cds-grid-column>
        <cds-grid-column>Current</cds-grid-column>
        <cds-grid-column id="last-grid-column" position="fixed">About</cds-grid-column>
        <cds-grid-row>
          <cds-grid-cell id="first-grid-cell">APPL</cds-grid-cell>
          <cds-grid-cell>$1000</cds-grid-cell>
          <cds-grid-cell>$0</cds-grid-cell>
          <cds-grid-cell id="last-grid-cell">...</cds-grid-cell>
        </cds-grid-row>
      </cds-grid>
    `);

    grid = element.querySelector<CdsGrid>('cds-grid');
    firstColumn = element.querySelector<CdsGridColumn>('#first-grid-column');
    lastColumn = element.querySelector<CdsGridColumn>('#last-grid-column');
    firstCell = element.querySelector<CdsGridCell>('#first-grid-cell');
    lastCell = element.querySelector<CdsGridCell>('#last-grid-cell');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should support fixed left position', async () => {
    await componentIsStable(grid);
    expect(getComputedStyle(firstColumn).left).toBe('0px');
    expect(getComputedStyle(firstColumn).right).toBe('auto');
    expect(getComputedStyle(firstCell).getPropertyValue('--border-left').trim()).toBe('0');
    expect(getComputedStyle(firstCell).getPropertyValue('--border-right').trim()).toBe(
      'calc((1 / 20) * 1rem) solid hsl(198, 14%, 82%)'
    );
  });

  it('should support fixed right position', async () => {
    await componentIsStable(grid);
    expect(getComputedStyle(lastColumn).right).toBe('0px');
    expect(getComputedStyle(lastColumn).left).toBe('auto');
    expect(getComputedStyle(lastCell).getPropertyValue('--border-right').trim()).toBe('0');
    expect(getComputedStyle(lastCell).getPropertyValue('--border-left').trim()).toBe(
      'calc((1 / 20) * 1rem) solid hsl(198, 14%, 82%)'
    );
  });

  it('should support sticky position', async () => {
    firstColumn.position = 'sticky';
    await componentIsStable(grid);
    expect(getComputedStyle(firstColumn).left).toBe('0px');
    expect(getComputedStyle(firstColumn).right).toBe('auto');
    expect(getComputedStyle(firstCell).getPropertyValue('--border-left').trim()).toBe('0');
    expect(getComputedStyle(firstCell).getPropertyValue('--border-right').trim()).toBe(
      'calc((1 / 20) * 1rem) solid hsl(198, 14%, 82%)'
    );
  });
});
