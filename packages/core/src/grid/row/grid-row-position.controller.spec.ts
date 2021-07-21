/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement } from 'lit';
import { createTestElement, removeTestElement, componentIsStable } from '@cds/core/test';
import { GridRowPositionController } from './grid-row-position.controller.js';
import { registerElementSafely, property } from '@cds/core/internal';

class GridRowPositionTestElement extends LitElement {
  @property() position: '' | 'fixed';
  protected gridRowPositionController = new GridRowPositionController(this);
}

registerElementSafely('grid-row-position-test-element', GridRowPositionTestElement);

describe('grid-row-position.controller', () => {
  let component: GridRowPositionTestElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(html`<grid-row-position-test-element></grid-row-position-test-element>`);
    component = element.querySelector<GridRowPositionTestElement>('grid-row-position-test-element');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should set a offset scroll height if fixed position', async () => {
    await componentIsStable(component);
    expect(component.style.getPropertyValue('--scroll-padding-top')).toBe('');

    component.position = 'fixed';
    await componentIsStable(component);
    expect(component.style.getPropertyValue('--scroll-padding-top')).toBe('calc(var(--row-height) * 2)');

    component.style.setProperty('--scroll-padding-top', '20px');
    component.position = '';
    await componentIsStable(component);
    expect(component.style.getPropertyValue('--scroll-padding-top')).toBe('');
  });
});
