import { html, LitElement } from 'lit';
import { createFragment, customElement, FocusFirstController } from '@cds/core/internal';
import { componentIsStable, createTestElement, removeTestElement } from '@cds/core/test';

@customElement('focus-first-controller-test-element')
class FocusFirstControllerTestElement extends LitElement {
  focusFirstController = new FocusFirstController(this);
  render() {
    return html`
      <slot></slot>
      <button cds-focus-first>shadow dom</button>
    `;
  }
}

describe('aria-popup-trigger.controller', () => {
  let component: HTMLElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(
      html`<focus-first-controller-test-element></focus-first-controller-test-element>`
    );
    component = element.querySelector<FocusFirstControllerTestElement>('focus-first-controller-test-element');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should focus first element with attribute cds-focus-first in shadow dom', async () => {
    await componentIsStable(component);
    expect(((component.shadowRoot as any).activeElement as HTMLElement).innerText).toBe('shadow dom');
  });

  it('should focus first element with attribute cds-focus-first in light dom', async () => {
    await componentIsStable(component);
    component.appendChild(createFragment('<button cds-focus-first>light dom</button>'));
    expect(((component.getRootNode() as any).activeElement as HTMLElement).innerText).toBe('light dom');
  });
});
