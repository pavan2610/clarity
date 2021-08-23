import { html } from 'lit';
import { baseStyles, i18n, I18nService, property, state } from '@cds/core/internal';
import { CdsInternalOverlay } from '@cds/core/internal-components/overlay';
import styles from './grid-detail.element.scss';

export class CdsGridDetail extends CdsInternalOverlay {
  @property({ type: Boolean }) hidden = false;

  @property({ type: String }) anchor: HTMLElement | string;

  @state({ type: String, reflect: true, attribute: 'slot' }) slot = 'detail';

  @state({ type: String, reflect: true }) protected overlay: '' | 'full' = '';

  @i18n() i18n = I18nService.keys.grid;

  private get grid() {
    return this.parentElement;
  }

  private get activeRow() {
    return this.anchorElement?.closest('cds-grid-row');
  }

  private get anchorElement(): HTMLElement {
    return typeof this.anchor === 'string'
      ? (this.getRootNode() as HTMLElement).querySelector(`#${this.anchor}`)
      : this.anchor;
  }

  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html` <div class="private-host">
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
    this.grid?.addEventListener('cdsResizeChange', (e: any) => (this.overlay = e.detail.width > 500 ? '' : 'full'));
  }

  async updated(props: Map<string, any>) {
    super.updated(props);

    if (props.has('anchor') && this.anchor) {
      await this.updateComplete;
      this.setAnchorPointer(props.get('anchor'));
    }

    if (props.has('hidden')) {
      this.grid?.style.setProperty('--body-overflow', this.hidden ? 'auto' : 'hidden');

      if (!this.hidden) {
        this.setDetailWidthAlignment();
      }
    }
  }

  private setAnchorPointer(previousAnchor?: HTMLElement) {
    const top = this.anchorElement?.getBoundingClientRect()?.top - this?.getBoundingClientRect().top - 8;
    previousAnchor?.closest('cds-grid-row').removeAttribute('_detail-row');
    this.style.setProperty('--caret-top', `${top}px`);
    this.activeRow?.setAttribute('_detail-row', '');
  }

  private setDetailWidthAlignment() {
    const rowheader = Array.from(this.activeRow?.cells ?? []).find((c: any) => c.role === 'rowheader') as HTMLElement;
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
