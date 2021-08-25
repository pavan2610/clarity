/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html } from 'lit';
import { createTestElement, removeTestElement, componentIsStable } from '@cds/core/test';
import { CdsGridPlaceholder } from './grid-placeholder.element.js';
import '@cds/core/grid/register.js';

describe('cds-grid-placeholder', () => {
  let component: CdsGridPlaceholder;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(html`<cds-grid-placeholder></cds-grid-placeholder>`);
    component = element.querySelector<CdsGridPlaceholder>('cds-grid-placeholder');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should create component', async () => {
    await componentIsStable(component);
    expect(component).toBeTruthy();
  });

  it('should assign to the placeholder slot', async () => {
    await componentIsStable(component);
    expect(component.getAttribute('slot')).toBe('placeholder');
  });

  it('should enable style access via css part "placeholder"', async () => {
    await componentIsStable(component);
    expect(component.shadowRoot.querySelector('[part=placeholder]')).toBeTruthy();
  });
});