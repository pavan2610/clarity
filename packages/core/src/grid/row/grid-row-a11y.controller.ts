import { ReactiveControllerHost } from 'lit';

export type GridRowA11y = ReactiveControllerHost & HTMLElement & { rowIndex: number };

export class GridRowA11yController {
  private firstUpdated = false;

  constructor(private host: GridRowA11y) {
    host.addController(this);
  }

  async hostUpdated() {
    await this.host.updateComplete;

    if (!this.firstUpdated) {
      this.firstUpdated = true;
      this.host.setAttribute('role', 'row');
    }

    this.host.setAttribute('aria-rowindex', `${this.host.rowIndex}`); // set as attr instead of reflecting the property for performance (delay till after first update)
  }
}
