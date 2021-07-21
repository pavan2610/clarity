import { ReactiveControllerHost } from 'lit';

export type GridA11y = ReactiveControllerHost & HTMLElement & { rowCount: number };

export class GridA11yController {
  private firstUpdated = false;

  constructor(private host: GridA11y) {
    host.addController(this);
  }

  async hostUpdated() {
    await this.host.updateComplete;

    if (!this.firstUpdated) {
      this.firstUpdated = true;
      this.host.setAttribute('role', 'grid');
    }

    this.host.setAttribute('aria-rowcount', `${this.host.rowCount}`);
  }
}
