import { html, LitElement } from 'lit';
import { registerElementSafely, state } from '@cds/core/internal';
import { createTestElement, removeTestElement, componentIsStable } from '@cds/core/test';
import { GridColumnA11yController } from './grid-column-a11y.controller.js';

class GridColumnA11yTestElement extends LitElement {
  @state() colIndex = 1;

  protected gridColumnA11yController = new GridColumnA11yController(this);
}

registerElementSafely('grid-column-a11y-test-element', GridColumnA11yTestElement);

describe('grid-column-a11y.controller', () => {
  let component: GridColumnA11yTestElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(html`<grid-column-a11y-test-element></grid-column-a11y-test-element>`);
    component = element.querySelector<GridColumnA11yTestElement>('grid-column-a11y-test-element');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should set proper aria role attribute', async () => {
    await componentIsStable(component);
    expect(component).toBeTruthy();
    expect(component.getAttribute('role')).toBe('columnheader');
  });

  it('should set the proper aria-colindex', async () => {
    await componentIsStable(component);
    expect(component.getAttribute('aria-colindex')).toBe('1');

    component.colIndex = 2;
    await componentIsStable(component);
    expect(component.getAttribute('aria-colindex')).toBe('2');
  });

  it('should update the aria-sort when receiving a sortChange event', async () => {
    component.dispatchEvent(new CustomEvent('sortChange', { detail: 'accending' }));
    await componentIsStable(component);
    expect(component.getAttribute('aria-sort')).toBe('accending');
  });
});
