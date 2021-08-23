import { html, LitElement } from 'lit';
import { HiddenController, customElement } from '@cds/core/internal';
import { createTestElement, onceEvent, removeTestElement } from '@cds/core/test';

@customElement('hidden-controller-test-element')
class HiddenControllerTestElement extends LitElement {
  hiddenController = new HiddenController(this);
}

describe('hidden.controller', () => {
  let component: HTMLElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(html`<hidden-controller-test-element hidden></hidden-controller-test-element>`);
    component = element.querySelector<HiddenControllerTestElement>('hidden-controller-test-element');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should notify of host hidden removed', done => {
    let event: any;

    onceEvent(component, 'hiddenChange').then(e => {
      event = e;
      expect(event.detail).toBe(false);
      done();
    });

    component.removeAttribute('hidden');
  });

  it('should notify of host hidden added', done => {
    let event: any;
    component.removeAttribute('hidden');

    onceEvent(component, 'hiddenChange').then(e => {
      event = e;
      expect(event.detail).toBe(true);
      done();
    });

    component.setAttribute('hidden', '');
  });
});
