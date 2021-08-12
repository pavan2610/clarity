import { ReactiveControllerHost } from 'lit';

export class AriaPopupController {
  private observer: MutationObserver;

  constructor(private host: ReactiveControllerHost & HTMLElement & { trigger?: HTMLElement }) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.expand(!this.host.hasAttribute('hidden'));

    this.observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'hidden') {
          this.expand(!this.host.hasAttribute('hidden'));
        }
      }
    });

    this.observer.observe(this.host, { attributes: true });
  }

  hostDisconnected() {
    this.expand(false);
    this.observer.disconnect();
  }

  private expand(expand: boolean) {
    if (this.host.trigger?.hasAttribute('popup')) {
      this.host.trigger.setAttribute('aria-expanded', expand ? 'true' : 'false');
    }
  }
}
