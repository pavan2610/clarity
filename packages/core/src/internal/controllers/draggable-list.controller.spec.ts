import { html, LitElement } from 'lit';
import { registerElementSafely } from '@cds/core/internal';
import { componentIsStable, createTestElement, removeTestElement } from '@cds/core/test';

class DraggableListControllerTestElement extends LitElement {
  render() {
    return html`...`;
  }
}

registerElementSafely('draggable-list-controller-test-element', DraggableListControllerTestElement);

describe('draggable-list.controller', () => {
  let component: HTMLElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(
      html`<draggable-list-controller-test-element></draggable-list-controller-test-element>`
    );
    component = element.querySelector('draggable-list-controller-test-element');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should', async () => {
    await componentIsStable(component);
    expect(component).toBeTruthy();
  });
});
