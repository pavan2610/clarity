import { html, LitElement } from 'lit';
import { customElement, AriaPopupController } from '@cds/core/internal';
import { componentIsStable, createTestElement, removeTestElement } from '@cds/core/test';

@customElement('aria-popup-controller-test-element')
class AriaPopupControllerTestElement extends LitElement {
  ariaPopupController = new AriaPopupController(this);
  trigger: HTMLElement;
  render() {
    return html`...`;
  }
}

describe('aria-popup.controller', () => {
  let component: AriaPopupControllerTestElement;
  let element: HTMLElement;
  let trigger: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(
      html`<div popup="popup-el"></div>
        <aria-popup-controller-test-element id="popup-el" hidden></aria-popup-controller-test-element>`
    );
    component = element.querySelector<AriaPopupControllerTestElement>('aria-popup-controller-test-element');
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
