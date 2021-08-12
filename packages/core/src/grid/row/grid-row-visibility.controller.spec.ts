/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, css, LitElement } from 'lit';
import { createTestElement, removeTestElement, componentIsStable } from '@cds/core/test';
import { GridRowVisibilityController } from './grid-row-visibility.controller.js';
import { registerElementSafely } from '@cds/core/internal';

class GridRowVisibilityTestElement extends LitElement {
  gridBody: HTMLElement;
  static styles = [
    css`
      :host {
        --row-content-visibility: auto;
      }
    `,
  ];
  protected gridRowVisibilityController = new GridRowVisibilityController(this);
}

registerElementSafely('grid-row-visibility-test-element', GridRowVisibilityTestElement);

describe('grid-row-visibility.controller', () => {
  let component: GridRowVisibilityTestElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(html`<grid-row-visibility-test-element></grid-row-visibility-test-element>`);
    component = element.querySelector<GridRowVisibilityTestElement>('grid-row-visibility-test-element');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should set content visibility when scroll detected', async () => {
    await componentIsStable(component);
    expect(component.style.getPropertyValue('--row-content-visibility')).toBe('');

    component.shadowRoot.dispatchEvent(new Event('scroll', { bubbles: true }));
    await componentIsStable(component);
    expect(component.style.getPropertyValue('--row-content-visibility')).toBe('visibile');
  });
});
