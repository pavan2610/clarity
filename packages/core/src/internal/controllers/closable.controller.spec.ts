import { html, LitElement } from 'lit';
import { customElement, ClosableController, HiddenController } from '@cds/core/internal';
import { componentIsStable, createTestElement, onceEvent, removeTestElement } from '@cds/core/test';

@customElement('closable-controller-test-element')
class ClosableControllerTestElement extends LitElement {
  closableController = new ClosableController(this);
  hiddenController = new HiddenController(this);

  render() {
    return html`...`;
  }
}

describe('closable.controller', () => {
  let component: ClosableControllerTestElement;
  let element: HTMLElement;
  let button: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(
      html`
        <button></button>
        <closable-controller-test-element></closable-controller-test-element>`
    );
    component = element.querySelector<ClosableControllerTestElement>('closable-controller-test-element');
    button = element.querySelector<HTMLButtonElement>('button');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should provide closeChange event on escape', async () => {
    await componentIsStable(component);
    const eventPromise = onceEvent(component, 'closeChange');
    component.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
    const event = await eventPromise;
    expect(event.detail).toBe('escape-keypress');
  });

  it('should allow component to dispatch a custom close event', async () => {
    await componentIsStable(component);
    const eventPromise = onceEvent(component, 'closeChange');
    component.closableController.close('custom-close');
    const event = await eventPromise;
    expect(event.detail).toBe('custom-close');
  });

  it('should refocus on prior focused element when hidden', async () => {
    component.hidden = true;
    button.focus();
    await componentIsStable(component);
    
    component.hidden = false;
    await componentIsStable(component);
    button.blur();
    
    component.hidden = true;
    await componentIsStable(component);
    expect((component.getRootNode() as any).activeElement).toBe(button);
  });

  // it('should refocus on prior focused element when removed from DOM', async () => {
    // todo
  // });

  // it('should prevent escape event from bubbling past the host element', async () => {
    // todo
  // });
});
