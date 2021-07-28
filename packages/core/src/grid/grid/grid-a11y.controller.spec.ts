/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement } from 'lit';
import { createTestElement, removeTestElement, componentIsStable } from '@cds/core/test';
import { GridA11yController } from './grid-a11y.controller.js';
import { registerElementSafely, state } from '@cds/core/internal';

class GridA11yTestElement extends LitElement {
  @state() rowCount = 1;
  @state() colCount = 1;

  protected gridA11yController = new GridA11yController(this);
}

registerElementSafely('grid-a11y-test-element', GridA11yTestElement);

describe('grid-a11y.controller', () => {
  let component: GridA11yTestElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(html`<grid-a11y-test-element></grid-a11y-test-element>`);
    component = element.querySelector<GridA11yTestElement>('grid-a11y-test-element');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should set proper aria role attribute', async () => {
    await componentIsStable(component);
    expect(component).toBeTruthy();
    expect(component.getAttribute('role')).toBe('grid');
  });

  it('should set the proper aria-rowcount', async () => {
    await componentIsStable(component);
    expect(component.getAttribute('aria-rowcount')).toBe('1');

    component.rowCount = 2;
    await componentIsStable(component);
    expect(component.getAttribute('aria-rowcount')).toBe('2');
  });

  it('should set the proper aria-colcount', async () => {
    await componentIsStable(component);
    expect(component.getAttribute('aria-colcount')).toBe('1');

    component.colCount = 2;
    await componentIsStable(component);
    expect(component.getAttribute('aria-colcount')).toBe('2');
  });
});
