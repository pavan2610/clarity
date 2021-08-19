import { html, LitElement } from 'lit';
import { registerElementSafely } from '@cds/core/internal';
import { componentIsStable, createTestElement, removeTestElement } from '@cds/core/test';
import { AriaPopupTriggerController } from './aria-popup-trigger.controller.js';

class AriaPopupTriggerControllerTestElement extends LitElement {
  ariaPopupTriggerController = new AriaPopupTriggerController(this);
  render() {
    return html`...`;
  }
}

registerElementSafely('aria-popup-controller-test-element', AriaPopupTriggerControllerTestElement);

describe('aria-popup-trigger.controller', () => {
  let component: HTMLElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(
      html`<aria-popup-controller-test-element popup="popup-el"></aria-popup-controller-test-element>`
    );
    component = element.querySelector('aria-popup-controller-test-element');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should initialize aria attributes for popup type triggers', async () => {
    await componentIsStable(component);
    expect(component.getAttribute('aria-controls')).toBe('popup-el');
    expect(component.getAttribute('aria-haspopup')).toBe('true');
    expect(component.getAttribute('aria-expanded')).toBe('false');
  });
});
