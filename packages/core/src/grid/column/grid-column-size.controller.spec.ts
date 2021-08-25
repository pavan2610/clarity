/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement } from 'lit';
import { query } from 'lit/decorators/query.js';
import { registerElementSafely, state, property } from '@cds/core/internal';
import { CdsActionResize } from '@cds/core/actions';
import { createTestElement, removeTestElement, componentIsStable } from '@cds/core/test';
import { GridColumnSizeController } from './grid-column-size.controller.js';

class GridColumnSizeTestElement extends LitElement {
  @property() width?: string;
  @state() colIndex = 1;
  @query('#handle') resizeHandle: CdsActionResize;
  gridColumnSizeController = new GridColumnSizeController(this);

  render() {
    return html`<div id="handle"></div>`;
  }
}

registerElementSafely('grid-column-size-test-element', GridColumnSizeTestElement);

describe('grid-column-size.controller', () => {
  let component: GridColumnSizeTestElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(
      html`<grid-column-size-test-element
        style="height: 100px; width: 100px; display: block;"
      ></grid-column-size-test-element>`
    );
    component = element.querySelector<GridColumnSizeTestElement>('grid-column-size-test-element');
    component.colIndex = 1;
    component.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); // trigger initialization
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should set CSS Custom Property for column custom width values', async () => {
    component.width = '200px';
    await componentIsStable(component);
    expect(element.style.getPropertyValue('--ch1')).toBe('200px');
  });

  it('should resize a column when resizeChange occurs', async () => {
    component.shadowRoot.dispatchEvent(new CustomEvent('resizeChange', { detail: -10, bubbles: true }));
    await componentIsStable(component);
    expect(element.style.getPropertyValue('--ch1')).toBe('90px');
  });

  // it('should set the row column size when column header is resized', async () => {
  //   component.gridColumnSizeController.initializeResizer();
  //   await componentIsStable(component);
  //   component.style.width = '100%';
  //   element.style.width = '50px';
  //   await componentIsStable(component);
  //   expect(element.style.getPropertyValue('--c1')).toBe('200px');
  // });
});