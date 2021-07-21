import { ReactiveControllerHost } from 'lit';

export type GridRowPosition = ReactiveControllerHost &
  HTMLElement & {
    position: '' | 'fixed';
  };

export class GridRowPositionController {
  constructor(private host: GridRowPosition) {
    host.addController(this);
  }

  hostUpdated() {
    if (this.host.position === 'fixed') {
      this.setScrollTop('calc(var(--row-height) * 2)');
    } else if (this.host.style.getPropertyValue('--scroll-padding-top') !== '') {
      this.setScrollTop('');
    }
  }

  private setScrollTop(value: string) {
    this.host.style.setProperty('--scroll-padding-top', value);
  }
}
