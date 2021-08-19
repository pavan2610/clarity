import { ReactiveControllerHost } from 'lit';

export type GridColumnPosition = ReactiveControllerHost &
  HTMLElement & {
    colIndex: number;
    position: '' | 'sticky' | 'fixed';
  };

export class GridColumnPositionController {
  private styles: HTMLElement;
  private previousPosition: '' | 'sticky' | 'fixed' = '';

  get hostGrid() {
    return this.host.parentElement as HTMLElement & { _id: string };
  }

  constructor(private host: GridColumnPosition) {
    host.addController(this);
  }

  async hostUpdated() {
    await this.host.updateComplete;

    if (this.host.colIndex && this.host.position !== this.previousPosition) {
      this.previousPosition = this.host.position;
      
      if (!this.styles) {
        this.styles = document.createElement('style');
        this.hostGrid.append(this.styles);
      }

      this.calculateColumnPositionStyles();
    }
  }

  private calculateColumnPositionStyles() {
    const gridPosition = this.hostGrid.getBoundingClientRect();
    const side = this.host.offsetLeft < gridPosition.width / 2 ? 'left' : 'right';
    this.styles.innerHTML = `${this.getPositionStyle(side, gridPosition)}\n${this.borderStyle(side)}`;
  }

  private getPositionStyle(side: 'left' | 'right', gridPosition: DOMRect) {
    const position = this.host.getBoundingClientRect();
    const left = this.host.position === 'fixed' ? `${position.left - gridPosition.left - 1}px` : 'initial';
    const right = this.host.position === 'fixed' ? `${position.right - position.left - position.width}px` : 'initial';

    return `
    [__id='${this.hostGrid._id}'] [aria-colindex="${this.host.colIndex}"] {
      ${side === 'left' ? `left: ${left};` : ''}
      ${side === 'right' ? `right: ${right};` : ''}
      ${this.host.position === 'sticky' ? `left: 0px;` : ''}
    }`;
  }

  private borderStyle(side: 'left' | 'right') {
    return this.host.position !== ''
      ? `
      [__id='${this.hostGrid._id}'] cds-grid-cell[aria-colindex="${this.host.colIndex}"] {
        --border-${
          side === 'left' ? 'right' : 'left'
        }: var(--cds-alias-object-border-width-100) solid var(--cds-alias-object-border-color);
        z-index: 98;
      }`
      : '';
  }
}
