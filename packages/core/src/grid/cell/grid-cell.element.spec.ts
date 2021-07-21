/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html } from 'lit';
import { createTestElement, removeTestElement, componentIsStable } from '@cds/core/test';
import { CdsGridCell } from './grid-cell.element.js';
import '@cds/core/grid/register.js';

describe('cds-grid-cell', () => {
  let component: CdsGridCell;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(html`<cds-grid-cell></cds-grid-cell>`);
    component = element.querySelector<CdsGridCell>('cds-grid-cell');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should create component', async () => {
    await componentIsStable(component);
    expect(component).toBeTruthy();
  });

  it('should enable style access via css part "cell"', async () => {
    await componentIsStable(component);
    expect(component.shadowRoot.querySelector('[part=cell]')).toBeTruthy();
  });

  it('should set proper aria role attribute (a11y controller)', async () => {
    await componentIsStable(component);
    expect(component).toBeTruthy();
    expect(component.getAttribute('role')).toBe('gridcell');
  });

  it('should set the proper aria-colindex (a11y controller)', async () => {
    component.colIndex = 1;
    await componentIsStable(component);
    expect(component.getAttribute('aria-colindex')).toBe('1');
  });
});
