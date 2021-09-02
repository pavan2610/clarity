/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement } from 'lit';
import { customElement, property, PerformanceController } from '@cds/core/internal';
import { createTestElement, removeTestElement, componentIsStable, onceEvent } from '@cds/core/test';
import '@cds/core/grid/register.js';

@customElement('performance-controller-test-element') // @ts-ignore
class PerformanceControllerTestElement extends LitElement {
  @property({ type: Array }) items = Array.from(Array(10).keys());
  performanceController = new PerformanceController(this);

  render() {
    return html`${this.items.map(
      i => html`<div style="display: block; width: 100px; height: 100px; background: blue;">${i}</div>`
    )}`;
  }
}

describe('cds-grid render performance', () => {
  let component: PerformanceControllerTestElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(
      html`<performance-controller-test-element cds-performance="test"></performance-controller-test-element>`
    );
    component = element.querySelector<PerformanceControllerTestElement>('performance-controller-test-element');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should report slow renders of more than 1000ms', async () => {
    component.items = Array.from(Array(100000).keys());
    await componentIsStable(component);
    const eventPromise = onceEvent(component, 'cdsPerformanceChange');
    const event = await eventPromise;
    expect(event.detail.score).toBe('🐢', event.detail.entry.duration);
    expect(event.detail.entry.entryType).toBe('measure');
  });

  it('should report fast renders of less than 250ms', async () => {
    component.items = Array.from(Array(10).keys());
    await componentIsStable(component);
    const eventPromise = onceEvent(component, 'cdsPerformanceChange');
    const event = await eventPromise;
    expect(event.detail.score).toBe('🚀', event.detail.entry.duration);
    expect(event.detail.entry.entryType).toBe('measure');
  });
});
