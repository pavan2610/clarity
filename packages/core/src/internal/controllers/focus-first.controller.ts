import { ReactiveControllerHost } from 'lit';
import { getFlattenedFocusableItems } from '@cds/core/internal';

export class FocusFirstController {
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
    this.host.addEventListener('hiddenChange', () => this.cdsFocusFirst());
    this.cdsFocusFirst();
  }

  private cdsFocusFirst() {
    if (!this.host.hidden) {
      this.focusableItems.find((e: HTMLElement) => e.hasAttribute('cds-focus-first')).focus();
    }
  }
}
