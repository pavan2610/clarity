import { LitElement, html } from 'lit';
import { query } from 'lit/decorators/query.js';
import '@cds/core/internal-components/close-button/register.js';
import { baseStyles, i18n, I18nService, property } from '@cds/core/internal';
import styles from './grid-detail.element.scss';

export class CdsGridDetail extends LitElement {
  @property({ type: String, reflect: true }) slot = 'detail';

  @property({ type: Boolean }) hidden = false;

  @property({ type: Object, attribute: false }) anchor: HTMLElement;

  @i18n() i18n = I18nService.keys.grid;

  @query('cds-internal-overlay', true) overlay: HTMLElement;

  static styles = [baseStyles, styles];

  render() {
    return html` ${!this.hidden
      ? html`
          <cds-internal-overlay @closeChange=${this.close} cds-motion="off">
            <div class="detail" tabindex="-1">
              <div class="caret"></div>
              <slot></slot>
              <cds-action @click=${this.close} shape="times" aria-label=${this.i18n.closeDetails}></cds-action>
            </div>
          </cds-internal-overlay>
        `
      : ''}`;
  }

  async updated(props: Map<string, any>) {
    super.updated(props);

    if (props.has('anchor')) {
      await this.updateComplete;
      this.setAnchorPointer();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.close();
  }

  private setAnchorPointer() {
    const top = this.anchor.getBoundingClientRect()?.top - this.overlay?.getBoundingClientRect().top - 8;
    this.style.setProperty('--caret-top', `${top}px`);
    this.parentElement?.style.setProperty('--body-overflow', this.hidden ? 'auto' : 'hidden');
  }

  private close() {
    this.dispatchEvent(new CustomEvent('closeChange'));
    this.anchor?.focus();
    this.parentElement?.style.setProperty('--body-overflow', 'auto');
  }
}
