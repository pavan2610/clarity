import { ReactiveControllerHost } from 'lit';
import { elementResize, isNumericString, supportsAdoptingStyleSheets } from '@cds/core/internal';
import { CdsActionResize } from '@cds/core/actions';

export type GridColumnSize = ReactiveControllerHost &
  HTMLElement & {
    colIndex: number;
    width?: string;
    resizeHandle: CdsActionResize;
  };

export class GridColumnSizeController {
  private globalStyle = supportsAdoptingStyleSheets() ? new CSSStyleSheet() : null;

  private get hostGrid() {
    return this.host.parentElement as HTMLElement;
  }

  constructor(private host: GridColumnSize) {
    this.host.addController(this as any);

    if (this.globalStyle) {
      (document as any).adoptedStyleSheets = [...(document as any).adoptedStyleSheets, this.globalStyle];
    }
  }

  initializeResizer() {
    elementResize(
      this.host,
      () => {
        this.hostGrid?.style.setProperty(
          `--c${this.host.colIndex}`,
          `${parseInt(getComputedStyle(this.host).width)}px`
        );
      },
      false
    );
  }

  protected async hostConnected() {
    await this.host.updateComplete;
    this.host.resizeHandle?.addEventListener('resizeChange', (e: any) => this.updateResizedColumnWidth(e.detail));
  }

  protected hostUpdated() {
    if (this.host.width && this.host.colIndex !== undefined) {
      this.hostGrid.style.setProperty(`--ch${this.host.colIndex}`, `${this.host.width}px`);
    }
  }

  private updateResizedColumnWidth(width: number) {
    const updatedWidth = Math.max(
      isNumericString(this.host.width) ? parseInt(this.host.width) : 44,
      parseInt(getComputedStyle(this.host).width) + width
    );
    this.hostGrid.style.setProperty(`--ch${this.host.colIndex}`, `${updatedWidth}px`);
    this.host.dispatchEvent(new CustomEvent('widthChange', { detail: updatedWidth, bubbles: true }));
  }
}
