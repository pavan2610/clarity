import { ReactiveControllerHost } from 'lit';
import { elementResize, isNumericString, onFirstInteraction } from '@cds/core/internal';
import { CdsActionResize } from '@cds/core/actions';

export type GridColumnSize = ReactiveControllerHost &
  HTMLElement & {
    colIndex: number;
    width?: string;
    resizeHandle: CdsActionResize;
    type?: string;
  };

export class GridColumnSizeController {
  private observers: ResizeObserver[] = [];

  private get hostGrid() {
    return this.host.parentElement as HTMLElement;
  }

  constructor(private host: GridColumnSize) {
    this.host.addController(this);

    if ((this.host.type === 'action' || this.host.getAttribute('type') === 'action') && !this.host.width) {
      this.host.width = '36px';
    }
  }

  async hostConnected() {
    await this.host.updateComplete;
    await onFirstInteraction(this.hostGrid);
    this.observers.push(elementResize(this.host, () => this.updateResizedCellWidth(), false));
    this.host.resizeHandle?.addEventListener('resizeChange', (e: any) => {
      this.host.dispatchEvent(new CustomEvent('resizeChange', { detail: e.detail, bubbles: true }));
      this.updateResizedColumnWidth(e.detail);
    });
  }

  async hostUpdated() {
    await this.host.updateComplete;
    this.updateSetColumnWidth();
  }

  hostDisconnected() {
    this.observers.forEach(o => o.disconnect());
  }

  private updateResizedCellWidth() {
    this.hostGrid?.style.setProperty(`--c${this.host.colIndex}`, `${parseInt(getComputedStyle(this.host).width)}px`);
  }

  private updateSetColumnWidth() {
    if (this.host.width && this.host.colIndex !== undefined) {
      this.hostGrid.style.setProperty(`--ch${this.host.colIndex}`, this.host.width);
    }
  }

  private updateResizedColumnWidth(width: number) {
    const updatedWidth = Math.max(
      isNumericString(this.host.width) || this.host.width?.includes('px') ? parseInt(this.host.width) : 36,
      parseInt(getComputedStyle(this.host).width) + width
    );
    this.hostGrid.style.setProperty(`--ch${this.host.colIndex}`, `${updatedWidth}px`);
  }
}
