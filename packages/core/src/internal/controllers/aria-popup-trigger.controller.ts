import { ReactiveControllerHost } from 'lit';

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
