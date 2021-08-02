import { ReactiveControllerHost } from 'lit';
import { elementResize, isNumericString, pxToRem, supportsAdoptingStyleSheets } from '@cds/core/internal';
import { CdsActionResize } from '@cds/core/actions';

export type GridColumnSize = ReactiveControllerHost &
  HTMLElement & {
    colIndex: number;
    width?: string;
    resizeHandle: CdsActionResize;
    type?: string;
  };

export class GridColumnSizeController {
  private globalStyle = supportsAdoptingStyleSheets() ? new CSSStyleSheet() : null;

  private resizeObserver: ResizeObserver;

  private get hostGrid() {
    return this.host.parentElement as HTMLElement;
  }

  constructor(private host: GridColumnSize) {
    this.host.addController(this);

    if (this.globalStyle) {
      (document as any).adoptedStyleSheets = [...(document as any).adoptedStyleSheets, this.globalStyle];
    }

    if ((this.host.type === 'action' || this.host.getAttribute('type') === 'action') && !this.host.width) {
      this.host.width = pxToRem(36);
    }
  }

  async initialize() {
    await this.host.updateComplete;
    if (!this.resizeObserver) {
      this.resizeObserver = elementResize(
        this.host,
        () => {
          this.hostGrid?.style.setProperty(
            `--c${this.host.colIndex}`,
            `${parseInt(getComputedStyle(this.host).width)}px`
          );
        },
        false
      );

      this.host.resizeHandle?.addEventListener('resizeChange', (e: any) => this.updateResizedColumnWidth(e.detail));
    }
  }

  hostUpdated() {
    if (this.host.width && this.host.colIndex !== undefined) {
      this.hostGrid.style.setProperty(`--ch${this.host.colIndex}`, this.host.width);
    }
  }

  hostDisconected() {
    this.resizeObserver.disconnect();
  }

  private updateResizedColumnWidth(width: number) {
    const updatedWidth = Math.max(
      isNumericString(this.host.width) || this.host.width?.includes('px') ? parseInt(this.host.width) : 44,
      parseInt(getComputedStyle(this.host).width) + width
    );
    this.hostGrid.style.setProperty(`--ch${this.host.colIndex}`, `${updatedWidth}px`);
    this.host.dispatchEvent(new CustomEvent('widthChange', { detail: updatedWidth, bubbles: true }));
  }
}
