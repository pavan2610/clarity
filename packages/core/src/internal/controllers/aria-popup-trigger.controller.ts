import { ReactiveControllerHost } from 'lit';

/**
 * Provides all nessesary aria-* attributes to create a vaild aria popup trigger
 */
export class AriaPopupTriggerController {
  constructor(private host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this);
  }

  hostConnected() {
    const popup = this.host.getAttribute('popup');
    if (popup) {
      this.host.setAttribute('aria-controls', popup);
      this.host.setAttribute('aria-haspopup', 'true');
      this.host.setAttribute('aria-expanded', 'false');
    }
  }
}
