import { ReactiveControllerHost } from 'lit';
import { listenForAttributeChange } from '../utils/events.js';
import { getFlattenedFocusableItems } from '../utils/traversal.js';

/**
 * Provides a focus first behavior to any component via the cds-first-focus attribute
 */
export class FirstFocusController {
  private observer: MutationObserver;

  constructor(private host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this);
  }

  private get focusableItems() {
    return getFlattenedFocusableItems(this.root);
  }

  private get root() {
    return (this.host.shadowRoot ? this.host.shadowRoot : this.host) as HTMLElement;
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.observer = listenForAttributeChange(this.host, 'hidden', () => this.cdsFocusFirst());
    this.cdsFocusFirst();
  }

  hostDisconnected() {
    this.observer.disconnect();
  }

  private cdsFocusFirst() {
    if (!this.host.hidden) {
      this.focusableItems.find((e: HTMLElement) => e.hasAttribute('cds-first-focus')).focus();
    }
  }
}
