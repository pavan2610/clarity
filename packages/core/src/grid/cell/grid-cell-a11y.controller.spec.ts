/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement } from 'lit';
import { createTestElement, removeTestElement, componentIsStable } from '@cds/core/test';
import { GridCellA11yController } from './grid-cell-a11y.controller.js';
import { registerElementSafely, state } from '@cds/core/internal';

class GridCellA11yTestElement extends LitElement {
  @state() colIndex = 1;
  @state() selected = false;

  protected gridCellA11yController = new GridCellA11yController(this);
}

registerElementSafely('grid-cell-a11y-test-element', GridCellA11yTestElement);

describe('grid-cell-a11y.controller', () => {
  let component: GridCellA11yTestElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(html`<grid-cell-a11y-test-element></grid-cell-a11y-test-element>`);
    component = element.querySelector<GridCellA11yTestElement>('grid-cell-a11y-test-element');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should set proper aria role attribute', async () => {
    await componentIsStable(component);
    expect(component).toBeTruthy();
    expect(component.getAttribute('role')).toBe('gridcell');
  });

  it('should set the proper aria-colindex', async () => {
    await componentIsStable(component);
    expect(component.getAttribute('aria-colindex')).toBe('1');

    component.colIndex = 2;
    await componentIsStable(component);
    expect(component.getAttribute('aria-colindex')).toBe('2');
  });
});
