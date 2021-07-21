import { ReactiveControllerHost } from 'lit';

export class ResponsiveController {
  elementRect = {} as DOMRectReadOnly;

  private host: ReactiveControllerHost;

  private _observer: ResizeObserver;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {
    this._observer = new ResizeObserver(entries => {
      window.requestAnimationFrame(() => {
        this.elementRect = entries[0].contentRect;
        ((this.host as unknown) as HTMLElement).dispatchEvent(
          new CustomEvent('elementRectChange', { detail: this.elementRect })
        );
        this.host.requestUpdate();
      });
    });

    this._observer.observe(this.host as any);
  }

  hostDisconnected() {
    this._observer.disconnect();
  }
}
