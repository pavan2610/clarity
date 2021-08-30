import { ReactiveControllerHost } from 'lit';
import { onAnyKey } from '../utils/keycodes.js';

interface ClosableConfig {
  escape?: boolean;
  lastFocus?: boolean;
  closable?: () => boolean;
}

/**
 * Given a closable component provides the following
 * - close on escape
 * - focus to trigger
 * - close method for component specific events
 */
export class ClosableController {
  private config: ClosableConfig;
  private priorActiveElement: HTMLElement;

  constructor(private host: ReactiveControllerHost & HTMLElement, config?: ClosableConfig) {
    this.config = { escape: true, lastFocus: true, closable: () => true, ...config };
    this.host.addController(this);
  }

  hostConnected() {
    this.togglePriorActiveElement();
    this.host.addEventListener('keyup', (e: KeyboardEvent) => this.keyEvent(e));
    this.host.addEventListener('hiddenChange', () => this.togglePriorActiveElement());
  }

  hostDisconnected() {
    this.priorActiveElement?.focus();
  }

  close(detail?: any) {
    if (this.config.closable()) {
      this.host.dispatchEvent(new CustomEvent('closeChange', { detail }));
    }
  }

  private togglePriorActiveElement() {
    if (this.host.hidden && this.config.lastFocus) {
      this.priorActiveElement?.focus();
    } else {
      this.setPriorActiveElement();
    }
  }

  private setPriorActiveElement() {
    this.priorActiveElement = (this.host.getRootNode() as any).activeElement;
  }

  private keyEvent(e: KeyboardEvent) {
    if (this.config.escape) {
      onAnyKey(['escape'], e, () => {
        e.preventDefault();
        e.stopPropagation();
        this.close('escape-keypress');
      });
    }
  }
}
