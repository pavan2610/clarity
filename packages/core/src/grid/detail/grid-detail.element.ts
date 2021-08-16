import { html } from 'lit';
import { baseStyles, i18n, I18nService, property, state } from '@cds/core/internal';
import styles from './grid-detail.element.scss';
import { CdsInternalOverlay } from '@cds/core/internal-components/overlay';

export class CdsGridDetail extends CdsInternalOverlay {
  @property({ type: Boolean }) hidden = false;

  @property({ type: Object }) anchor: HTMLElement;

  @state({ type: String, reflect: true, attribute: 'slot' }) slot = 'detail';

  @i18n() i18n = I18nService.keys.grid;

  private get grid() {
    return this.parentElement;
  }

  private get activeRow() {
    return this.anchor?.closest('cds-grid-row');
  }

  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html` ${this.backdropTemplate}
      <div class="private-host" part="private-host" tabindex="-1" aria-modal="true" role="dialog">
        <div class="detail">
          <slot></slot>
          <cds-action
            @click=${() => this.closeOverlay('close-button-click')}
            shape="times"
            aria-label=${this.i18n.closeDetails}
          ></cds-action>
        </div>
        <div class="caret"></div>
      </div>`;
  }

  constructor() {
    super();
    this.cdsMotion = 'off';
  }

  async updated(props: Map<string, any>) {
    super.updated(props);

    if (props.has('anchor') && this.anchor) {
      await this.updateComplete;
      this.setAnchorPointer(props.get('anchor'));
    }

    if (props.has('hidden')) {
      this.parentElement?.style.setProperty('--body-overflow', this.hidden ? 'auto' : 'hidden');

      if (!this.hidden) {
        this.setDetailWidthAlignment();
      }
    }
  }

  private setAnchorPointer(previousAnchor: HTMLElement) {
    const top = this.anchor?.getBoundingClientRect()?.top - this?.getBoundingClientRect().top - 8;
    previousAnchor?.closest('cds-grid-row').removeAttribute('_detail-row');
    this.style.setProperty('--caret-top', `${top}px`);
    this.activeRow?.setAttribute('_detail-row', '');
  }

  private setDetailWidthAlignment() {
    const rowheader = Array.from(this.activeRow?.cells ?? []).find(
      (c: any) => c.getAttribute('role') === 'rowheader'
    ) as HTMLElement;
    if (rowheader) {
      const cellRect = rowheader.getBoundingClientRect();
      const gridRect = this.grid.getBoundingClientRect();
      const rtl = this.grid.getAttribute('dir') === 'rtl';
      this.style.setProperty('--width', 'auto');

      if (rtl) {
        this.style.right = `${gridRect.right - cellRect.left}px`;
      } else {
        this.style.left = `${cellRect.right - gridRect.left}px`;
      }
    }
  }
}
