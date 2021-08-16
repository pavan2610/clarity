import { css, html } from 'lit';
import { query } from 'lit/decorators/query.js';
import { AriaPopupController, property } from '@cds/core/internal';
import { CdsInternalOverlay } from '@cds/core/internal-components/overlay';

/**
 * Placeholder/WIP component
 */
export class CdsDropdown extends CdsInternalOverlay {
  @property({ type: Boolean }) hidden = false;

  @property({ type: String }) position: 'top' | 'bottom' | 'right' = 'bottom';

  @property({ type: String, reflect: true }) anchor: HTMLElement | string;

  @query('.content', true) content: HTMLElement;

  protected ariaPopupController = new AriaPopupController(this);

  get trigger() {
    return this.focusTrap.previousFocus;
  }

  render() {
    return html` ${this.backdropTemplate}
      <div class="content"><slot></slot></div>`;
  }

  firstUpdated(props: Map<string, any>) {
    super.firstUpdated(props);
    this.cdsMotion = 'off';
  }

  async updated(props: Map<string, any>) {
    super.updated(props);
    await this.updateComplete;

    if (!this.hidden && this.anchor) {
      this.open();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.closeOverlay();
  }

  private open() {
    const trigger = this.focusTrap.previousFocus.getBoundingClientRect();

    if (this.position === 'top') {
      this.content.style.top = `${trigger.top - this.content.getBoundingClientRect().height}px`;
      this.content.style.left = `${trigger.left}px`;
    }

    if (this.position === 'bottom') {
      this.content.style.top = `${trigger.bottom + 4}px`;
      this.content.style.left = `${trigger.left}px`;
    }

    if (this.position === 'right') {
      this.content.style.top = `${trigger.top + 2}px`;
      this.content.style.left = `${trigger.right}px`;
    }
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: block;
          --backdrop-background: none;
        }

        :host([hidden]) {
          display: none !important;
        }

        :host([anchor]) {
          position: fixed;
        }

        :host([anchor]) .content {
          position: fixed;
        }

        .content {
          background: var(--cds-alias-object-overlay-background);
          border: 0;
          box-shadow: var(--cds-alias-object-shadow-100);
          margin: 0;
          display: flex;
          flex-direction: column;
          min-width: 140px;
          min-height: 40px;
          padding: 12px;
        }

        .overlay-backdrop {
          position: absolute;
        }
      `,
    ];
  }
}
