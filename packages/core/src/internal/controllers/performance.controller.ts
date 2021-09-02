import { ReactiveControllerHost } from 'lit';
import { LogService } from '../services/log.service.js';
import { createId } from '../utils/identity.js';

export interface CdsPerformance {
  entry: PerformanceEntry;
  score: string;
}

export class PerformanceController {
  markId: string;
  id: string;

  constructor(private host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this);
    this.id = this.host.getAttribute('cds-performance');
    this.renderStart();
  }

  hostConnected() {
    if (this.markId) {
      setTimeout(() => this.renderEnd());
    }
  }

  private renderStart() {
    if (this.id && performance) {
      this.markId = createId();
      performance.mark(`${this.markId}-start`);
    }
  }

  private renderEnd() {
    performance.mark(`${this.markId}-end`);
    performance.measure(this.markId, `${this.markId}-start`, `${this.markId}-end`);

    const entry = performance.getEntriesByName(this.markId).pop();
    const detail: CdsPerformance = { entry, score: this.getRenderScore(entry.duration) };

    performance.clearMarks(`${this.markId}-start`);
    performance.clearMarks(`${this.markId}-end`);
    performance.clearMeasures(this.markId);

    this.host.dispatchEvent(new CustomEvent('cdsPerformanceChange', { detail }));
    LogService.log(`${detail.score} ${this.id} render time: ~${detail.entry.duration.toFixed(2)}ms`);
  }

  private getRenderScore(renderDuration: number) {
    if (renderDuration > 1000) {
      return '🐢';
    } else if (renderDuration < 250) {
      return '🚀';
    } else {
      return '⏱️';
    }
  }
}
