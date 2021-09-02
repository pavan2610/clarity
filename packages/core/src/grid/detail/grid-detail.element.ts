import { html, LitElement } from 'lit';
import {
  AriaModalController,
  AriaPopupController,
  baseStyles,
  ClosableController,
  InlineFocusTrapController,
  i18n,
  I18nService,
  property,
  ResponsiveController,
  state,
  FocusFirstController,
  listenForAttributeChange,
} from '@cds/core/internal';
import styles from './grid-detail.element.scss';

/**
 * Grid Detail
 *
 * ```typescript
 * import '@cds/core/grid/register.js';
 * ```
 *
 * @element cds-grid-detail
 * @event closeChange
 * @csspart private-host
 * @csspart detail
 * @csspart caret
 * @csspart close
 * @cssprop --width
 * @cssprop --inset-inline-start
 * @cssprop --inset-inline-end
 * @cssprop --backdrop-background
 */
export class CdsGridDetail extends LitElement {
  @property({ type: String }) anchor: HTMLElement | string;

  @i18n() i18n = I18nService.keys.grid;

  @state({ type: String, reflect: true, attribute: 'slot' }) slot = 'detail';

  @state({ type: String, reflect: true }) protected overlay: '' | 'full' = '';

  protected ariaModalController = new AriaModalController(this);

  protected ariaPopupController = new AriaPopupController(this);

  protected closableController = new ClosableController(this);

  protected inlineFocusTrapController = new InlineFocusTrapController(this);

  protected focusFirstController = new FocusFirstController(this);

  protected responsiveController = new ResponsiveController(this, { element: this.parentElement });

  private observer: MutationObserver;

  get trigger(): HTMLElement {
    return typeof this.anchor === 'string'
      ? (this.getRootNode() as HTMLElement).querySelector(`#${this.anchor}`)
      : this.anchor;
  }

  static styles = [baseStyles, styles];

  render() {
    return html` <div part="private-host">
      <div part="detail">
        <slot></slot>
        <cds-action
          @click=${() => this.closableController.close()}
          shape="times"
          aria-label=${this.i18n.closeDetails}
          part="close"
          cds-focus-first
        ></cds-action>
      </div>
      <div part="caret"></div>
    </div>`;
  }

  constructor() {
    super();
    this.addEventListener('cdsResizeChange', (e: any) => (this.overlay = e.detail.width > 500 ? '' : 'full'));
    this.observer = listenForAttributeChange(this, 'hidden', (hidden: string) => {
      this.toggleScrollLock(!!hidden);
      this.toggleAnchorHover();
    });
  }

  async updated(props: Map<string, any>) {
    super.updated(props);
    await this.updateComplete;

    if (props.has('anchor') && this.anchor) {
      this.setAnchorPointer(props.get('anchor'));
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();
    this.trigger?.closest('cds-grid-row')?.removeAttribute('_detail-row');
  }

  private toggleAnchorHover() {
    if (this.hidden) {
      this.trigger?.closest('cds-grid-row')?.removeAttribute('_detail-row');
    } else {
      this.trigger?.closest('cds-grid-row')?.setAttribute('_detail-row', '');
    }
  }

  private toggleScrollLock(hidden: boolean) {
    if (hidden) {
      this.parentElement?.removeAttribute('scroll-lock');
    } else {
      this.parentElement?.setAttribute('scroll-lock', '');
      this.setDetailWidthAlignment();
    }
  }

  private setAnchorPointer(previousAnchor?: HTMLElement) {
    if (previousAnchor?.closest) {
      previousAnchor?.closest('cds-grid-row')?.removeAttribute('_detail-row');
    }

    this.toggleAnchorHover();
    const top = this.trigger?.getBoundingClientRect()?.top - this?.getBoundingClientRect().top - 8;
    this.style.setProperty('--caret-top', `${top}px`);
  }

  private setDetailWidthAlignment() {
    const rowheader = Array.from(this.trigger?.closest('cds-grid-row')?.cells ?? []).find(
      (c: any) => c.role === 'rowheader'
    ) as HTMLElement;
    if (rowheader) {
      const cellRect = rowheader.getBoundingClientRect();
      const gridRect = this.parentElement.getBoundingClientRect();
      const rtl = this.parentElement.getAttribute('dir') === 'rtl';
      this.style.setProperty('--width', 'auto');

      if (rtl) {
        this.style.right = `${gridRect.right - cellRect.left}px`;
      } else {
        this.style.left = `${cellRect.right - gridRect.left}px`;
      }
    }
  }
}
