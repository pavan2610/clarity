import { html, LitElement } from 'lit';
import { customElement, AriaModalController, AriaReflectionController } from '@cds/core/internal';
import { componentIsStable, createTestElement, removeTestElement } from '@cds/core/test';

@customElement('aria-modal-controller-test-element')
class AriaModalControllerTestElement extends LitElement {
  ariaModalController = new AriaModalController(this);
  ariaReflectionController = new AriaReflectionController(this);

  render() {
    return html`...`;
  }
}

describe('aria-modal.controller', () => {
  let component: HTMLElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(
      html`<aria-modal-controller-test-element></aria-modal-controller-test-element>`
    );
    component = element.querySelector<AriaModalControllerTestElement>('aria-modal-controller-test-element');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should initialize aria attributes for modal type components', async () => {
    await componentIsStable(component);
    expect(component.getAttribute('role')).toBe('dialog');
    expect(component.getAttribute('aria-modal')).toBe('true');
  });
});
