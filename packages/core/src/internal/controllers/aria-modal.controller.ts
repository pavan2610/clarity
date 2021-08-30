import { ReactiveControllerHost } from 'lit';

export class AriaModalController {
  constructor(private host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this);
  }

  hostConnected() {
    this.host.ariaModal = 'true';
    this.host.role = 'dialog';
  }
}
