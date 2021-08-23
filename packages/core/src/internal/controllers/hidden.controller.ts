import { ReactiveControllerHost } from 'lit';

export class HiddenController {
  private observer: MutationObserver;

  constructor(private host: ReactiveControllerHost & HTMLElement & { trigger?: HTMLElement }) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'hidden') {
          this.emit(this.host.hasAttribute('hidden'));
        }
      }
    });

    this.observer.observe(this.host, { attributes: true });
  }

  hostDisconnected() {
    this.observer.disconnect();
  }

  private emit(hidden: boolean) {
    this.host.dispatchEvent(new CustomEvent('hiddenChange', { detail: hidden, bubbles: true }));
  }
}
