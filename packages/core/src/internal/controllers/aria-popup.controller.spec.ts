import { html, LitElement } from 'lit';
import { registerElementSafely } from '@cds/core/internal';
import { componentIsStable, createTestElement, removeTestElement } from '@cds/core/test';
import { AriaPopupController } from './aria-popup.controller.js';

class AriaPopupControllerTestElement extends LitElement {
  ariaPopupController = new AriaPopupController(this);
  render() {
    return html`...`;
  }
}

registerElementSafely('aria-popup-controller-test-element', AriaPopupControllerTestElement);

describe('aria-popup.controller', () => {
  let component: HTMLElement & { trigger: HTMLElement };
  let element: HTMLElement;
  let trigger: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(
      html`<div popup="popup-el"></div><aria-popup-controller-test-element id="popup-el" hidden></aria-popup-controller-test-element>`
    );
    component = element.querySelector('aria-popup-controller-test-element');
    trigger = element.querySelector('div');
    component.trigger = trigger;
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should toggle aria-expanded on trigger if available', async () => {
    await componentIsStable(component);
    expect(trigger.getAttribute('aria-expanded')).toBe(null);

    component.removeAttribute('hidden');
    await componentIsStable(component);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    component.setAttribute('hidden', '');
    await componentIsStable(component);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });
});
