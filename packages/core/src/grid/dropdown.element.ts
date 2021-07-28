import { LitElement, css, html } from 'lit';
import { query } from 'lit/decorators/query.js';
import { property } from '@cds/core/internal';

/** placeholder component */
export class CdsDropdown extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          inset: 0;
          z-index: 999;
        }

        :host([hidden]),
        :host([hidden]) dialog {
          display: none !important;
        }

        dialog {
          background: var(--cds-alias-object-overlay-background);
          z-index: 9999;
          border: 0;
          box-shadow: var(--cds-alias-object-shadow-100);
          padding: 12px;
          margin: 0;
          display: block;
        }

        dialog::backdrop {
          background: transparent;
          /* backdrop-filter: blur(2px); */
        }

        :host(:not([backdrop])) dialog::backdrop {
          display: none;
        }

        :host([backdrop]) {
          position: fixed;
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

  @property({ type: String }) anchor: string | HTMLElement = '';

  @property({ type: Boolean }) backdrop = true;

  private get _anchorRef(): HTMLElement {
    return typeof this.anchor === 'string' ? this.getHost().querySelector(this.anchor) : this.anchor;
  }

  @query('dialog', true) private dialog: HTMLDialogElement;

  render() {
    return html`
      <dialog>
        <slot></slot>
      </dialog>
    `;
  }

  firstUpdated(props: Map<string, any>) {
    super.firstUpdated(props);

    this.addEventListener('click', event => {
      const rect = this.dialog.getBoundingClientRect();
      if (
        event.clientY < rect.top ||
        event.clientY > rect.bottom ||
        event.clientX < rect.left ||
        event.clientX > rect.right
      ) {
        this.close();
      }
    });

    this.dialog.addEventListener('close', () => {
      if (!this.hidden) {
        this.close();
      }
    });

    this.addEventListener('keydown', (e: any) => {
      if (e.code === 'Enter' || e.code === 'Escape') {
        this.close();
      }
    });
  }

  updated(props: Map<string, any>) {
    super.updated(props);

    if (props.has('hidden') && props.get('hidden') !== undefined && props.get('hidden') !== this.hidden) {
      if (this.hidden) {
        this.dialog.close();
        this._anchorRef?.focus();
      } else {
        this.open();
      }
    }
  }

  private getHost() {
    const root: any = this.getRootNode();
    return root?.host?.shadowRoot ? root.host.shadowRoot : root;
  }

  private open() {
    const rect = this._anchorRef.getBoundingClientRect();
    this.dialog.style.left = `${rect.left}px`;
    this.dialog.showModal();

    this.dialog.style.top =
      this.position === 'top' ? `${rect.top - this.dialog.getBoundingClientRect().height}px` : `${rect.bottom + 1}px`;
  }

  private close() {
    this.dispatchEvent(new CustomEvent('hiddenChange'));
  }
}
