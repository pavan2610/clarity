import { ReactiveControllerHost } from 'lit';
import { listenForAttributeChange } from '../utils/events.js';

/**
 * Provides all nessesary aria-* attributes to create a vaild aria popup
 */
export class AriaPopupController {
  private observer: MutationObserver;

  constructor(private host: ReactiveControllerHost & HTMLElement & { trigger: HTMLElement }) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.expand(!this.host.hasAttribute('hidden'));
    this.observer = listenForAttributeChange(this.host, 'hidden', () => this.expand(!this.host.hasAttribute('hidden')));
  }

  hostDisconnected() {
    this.expand(false);
    this.observer.disconnect();
  }

  private expand(expand: boolean) {
    if (this.host.trigger?.hasAttribute('popup')) {
      this.host.trigger.setAttribute('aria-expanded', expand ? 'true' : 'false');
      this.host.trigger.setAttribute('aria-pressed', expand ? 'true' : 'false');
    }
  }
}
