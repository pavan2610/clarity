/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement } from 'lit';
import { createTestElement, removeTestElement, componentIsStable } from '@cds/core/test';
import { GridRowA11yController } from './grid-row-a11y.controller.js';
import { registerElementSafely, state } from '@cds/core/internal';

class GridRowA11yTestElement extends LitElement {
  @state() rowIndex = 1;

  protected gridRowA11yController = new GridRowA11yController(this);
}

registerElementSafely('grid-row-a11y-test-element', GridRowA11yTestElement);

describe('grid-row-a11y.controller', () => {
  let component: GridRowA11yTestElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(html`<grid-row-a11y-test-element></grid-row-a11y-test-element>`);
    component = element.querySelector<GridRowA11yTestElement>('grid-row-a11y-test-element');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should set proper aria role attribute', async () => {
    await componentIsStable(component);
    expect(component).toBeTruthy();
    expect(component.getAttribute('role')).toBe('row');
  });

  it('should set the proper aria-rowindex', async () => {
    await componentIsStable(component);
    expect(component.getAttribute('aria-rowindex')).toBe('1');

    component.rowIndex = 2;
    await componentIsStable(component);
    expect(component.getAttribute('aria-rowindex')).toBe('2');
  });
});
