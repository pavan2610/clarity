import { ReactiveControllerHost } from 'lit';

export class GridRowVisibilityController {
  constructor(private host: ReactiveControllerHost & HTMLElement & { gridBody: HTMLElement }) {
    this.host.addController(this); // created on grid rather that row to only run once
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.host.shadowRoot.addEventListener(
      'scroll',
      () => this.host.style.setProperty('--row-content-visibility', 'visibile'),
      { once: true, capture: true }
    );
  }
}
