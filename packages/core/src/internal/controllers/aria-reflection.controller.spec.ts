import { html, LitElement } from 'lit';
import { customElement } from '@cds/core/internal';
import { componentIsStable, createTestElement, removeTestElement } from '@cds/core/test';
import { AriaReflectionController } from './aria-reflection.controller.js';

@customElement('aria-reflection-controller-test-element')
class AriaReflectionControllerTestElement extends LitElement {
  ariaReflectionController = new AriaReflectionController(this, false);
  render() {
    return html`...`;
  }
}

describe('aria-reflection.controller', () => {
  let component: HTMLElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(
      html`<aria-reflection-controller-test-element></aria-reflection-controller-test-element>`
    );
    component = element.querySelector<AriaReflectionControllerTestElement>('aria-reflection-controller-test-element');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should reflect attribute from property', async () => {
    await componentIsStable(component);
    component.ariaLabel = 'test-prop';
    expect(component.getAttribute('aria-label')).toBe('test-prop');
  });

  it('should reflect property from attribute', async () => {
    await componentIsStable(component);
    component.setAttribute('aria-label', 'test-attr');
    expect(component.ariaLabel).toBe('test-attr');
  });
});
