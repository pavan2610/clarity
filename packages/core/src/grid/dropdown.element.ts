import { css, html } from 'lit';
import { query } from 'lit/decorators/query.js';
import { property } from '@cds/core/internal';
import { CdsInternalOverlay } from '../internal-components/overlay';

/** placeholder component */
export class CdsDropdown extends CdsInternalOverlay {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: block;
          position: absolute;
          --backdrop-background: none;
        }

        :host([hidden]) {
          display: none !important;
        }

        .content {
          background: var(--cds-alias-object-overlay-background);
          border: 0;
          box-shadow: var(--cds-alias-object-shadow-100);
          padding: 12px;
          margin: 0;
          display: block;
          width: max-content;
          position: absolute;
        }

        .overlay-backdrop {
          position: absolute;
        }

        ::slotted(cds-button) {
          width: 100%;
          display: block;
          margin-bottom: 4px;
        }
      `,
    ];
  }

  @property({ type: Boolean }) hidden = false;

  @property({ type: String }) position: 'top' | 'bottom' = 'bottom';

  @property({ type: Object, reflect: false }) anchor: HTMLElement;

  @query('.content', true) content: HTMLElement;

  render() {
    return html` ${this.backdropTemplate}
      <div class="content"><slot></slot></div>`;
  }

  firstUpdated(props: Map<string, any>) {
    super.firstUpdated(props);
    this.cdsMotion = 'off';

    this.addEventListener('closeChange', () => this.close());
  }

  async updated(props: Map<string, any>) {
    super.updated(props);
    await this.updateComplete;

    if (!this.hidden) {
      this.open();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.close();
  }

  private open() {
    const anchorRect = this.anchor.getBoundingClientRect();
    this.content.style.left = `${anchorRect.left}px`;
    this.content.style.top =
      this.position === 'top'
        ? `${anchorRect.top - this.content.getBoundingClientRect().height}px`
        : `${anchorRect.bottom + 1}px`;
  }

  private close() {
    this.anchor?.focus();
  }
}
