/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html } from 'lit';
import { createTestElement, removeTestElement, componentIsStable } from '@cds/core/test';
import { CdsGridDetail } from '@cds/core/grid';
import '@cds/core/grid/register.js';

describe('cds-grid-detail', () => {
  let component: CdsGridDetail;
  let element: HTMLElement;
  let anchor: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(html`
      <div id="test-anchor"></div>
      <cds-grid-detail></cds-grid-detail>
    `);
    component = element.querySelector<CdsGridDetail>('cds-grid-detail');
    anchor = element.querySelector('#test-anchor');
    component.anchor = anchor;
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should create component', async () => {
    await componentIsStable(component);
    expect(component).toBeTruthy();
  });

  it('should assign to the detail slot', async () => {
    await componentIsStable(component);
    expect(component.getAttribute('slot')).toBe('detail');
  });
});
