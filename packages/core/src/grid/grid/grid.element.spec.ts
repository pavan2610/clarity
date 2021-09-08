/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement } from 'lit';
import { customElement, property } from '@cds/core/internal';
import { createTestElement, removeTestElement, componentIsStable, onceEvent } from '@cds/core/test';
import { CdsGrid } from './grid.element.js';
import '@cds/core/grid/register.js';

describe('cds-grid', () => {
  let component: CdsGrid;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(html` <cds-grid aria-label="basic datagrid" height="360">
      <cds-grid-column>Host</cds-grid-column>
      <cds-grid-column>Status</cds-grid-column>
      <cds-grid-column>CPU</cds-grid-column>
      <cds-grid-column>Memory</cds-grid-column>
      <cds-grid-row>
        <cds-grid-cell>vm-host-001</cds-grid-cell>
        <cds-grid-cell>online</cds-grid-cell>
        <cds-grid-cell>5%</cds-grid-cell>
        <cds-grid-cell>10%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>vm-host-003</cds-grid-cell>
        <cds-grid-cell>online</cds-grid-cell>
        <cds-grid-cell>10%</cds-grid-cell>
        <cds-grid-cell>30%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-footer></cds-grid-footer>
    </cds-grid>`);
    component = element.querySelector<CdsGrid>('cds-grid');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should create component', async () => {
    await componentIsStable(component);
    expect(component).toBeTruthy();
  });
});

@customElement('grid-performance-test-element')
class GridLayoutTestElement extends LitElement {
  @property({ type: Boolean }) show = false;
  @property({ type: Array }) items = Array.from(Array(1000).keys());

  render() {
    return html` ${this.show
      ? html` <cds-grid
          cds-performance="grid-test"
          @cdsPerformanceChange=${(e: any) =>
            this.dispatchEvent(new CustomEvent('cdsPerformanceChange', { detail: e.detail }))}
          aria-label="performance test datagrid"
          height="360"
        >
          <cds-grid-column>Column 1</cds-grid-column>
          <cds-grid-column>Column 2</cds-grid-column>
          <cds-grid-column>Column 3</cds-grid-column>
          <cds-grid-column>Column 4</cds-grid-column>
          ${this.items.map(
            i => html` <cds-grid-row>
              <cds-grid-cell>${i}-1</cds-grid-cell>
              <cds-grid-cell>${i}-2</cds-grid-cell>
              <cds-grid-cell>${i}-3</cds-grid-cell>
              <cds-grid-cell>${i}-4</cds-grid-cell>
            </cds-grid-row>`
          )}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>`
      : ''}`;
  }
}

describe('cds-grid render performance', () => {
  let component: GridLayoutTestElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(html`<grid-performance-test-element></grid-performance-test-element>`);
    component = element.querySelector<GridLayoutTestElement>('grid-performance-test-element');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should render 100 rows under 150ms', async () => {
    component.items = Array.from(Array(100).keys());
    await componentIsStable(component);
    const eventPromise = onceEvent(component, 'cdsPerformanceChange');
    component.show = true;
    const event = await eventPromise;
    expect(event.detail.entry.duration < 150).toBe(true, event.detail.entry.duration);
    expect(event.detail.entry.entryType).toBe('measure');
  });

  it('should render 1000 rows under 1000ms', async () => {
    component.items = Array.from(Array(1000).keys());
    await componentIsStable(component);
    const eventPromise = onceEvent(component, 'cdsPerformanceChange');
    component.show = true;
    const event = await eventPromise;
    expect(event.detail.entry.duration < 1000).toBe(true, event.detail.entry);
    expect(event.detail.entry.entryType).toBe('measure');
  });
});
