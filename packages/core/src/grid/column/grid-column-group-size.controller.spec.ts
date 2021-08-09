/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement } from 'lit';
import { registerElementSafely, state } from '@cds/core/internal';
import { createTestElement, removeTestElement, componentIsStable } from '@cds/core/test';
import {
  ColumnSizeType,
  GridColumnGroupSize,
  GridColumnGroupSizeController,
} from './grid-column-group-size.controller.js';

const columns = [document.createElement('div'), document.createElement('div'), document.createElement('div')].map(
  (c: ColumnSizeType, i) => {
    c.width = `${(i + 1) * 100}px`;
    c.colIndex = i + 1;
    return c;
  }
);

class GridColumnGroupSizeTestElement extends LitElement implements GridColumnGroupSize {
  @state() columns = columns;
  @state() columnLayout: 'fixed' | 'flex' = 'fixed';
  gridColumnSizeController = new GridColumnGroupSizeController(this);
}

registerElementSafely('grid-column-group-size-test-element', GridColumnGroupSizeTestElement);

describe('grid-column-size.controller', () => {
  let component: GridColumnGroupSizeTestElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(
      html`<grid-column-group-size-test-element></grid-column-group-size-test-element>`
    );
    component = element.querySelector<GridColumnGroupSizeTestElement>('grid-column-group-size-test-element');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  function intializeController() {
    component.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  }

  it('should create the grid layout for column headers', async () => {
    intializeController();
    await componentIsStable(component);
    expect(component.style.getPropertyValue('--ch-grid').trim()).toBe(
      'var(--ch1, 100px) var(--ch2, 200px) var(--ch3, 300px)'
    );
  });

  it('should create the grid layout for row cells', async () => {
    intializeController();
    await componentIsStable(component);
    expect(component.style.getPropertyValue('--c-grid').trim()).toBe(
      'var(--c1, 100px) var(--c2, 200px) var(--c3, 300px)'
    );
  });

  it('should initialize the grid column width sizes if a fixed layout', async () => {
    component.columnLayout = 'flex';
    await componentIsStable(component);
    expect(component.style.getPropertyValue('--ch1').trim()).toBe('');

    component.columnLayout = 'fixed';
    component.dispatchEvent(new CustomEvent('resizeChange', { bubbles: true }));
    await componentIsStable(component);
    expect(component.style.getPropertyValue('--ch1').trim()).toBe('100px');
    expect(component.style.getPropertyValue('--ch2').trim()).toBe('200px');
    expect(component.style.getPropertyValue('--ch3').trim()).toBe('minmax(300px, 100%)');
  });
});
