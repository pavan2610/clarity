import { LitElement, html } from 'lit';
import '@cds/core/internal-components/close-button/register.js';
import { baseStyles, property, getTabableItems } from '@cds/core/internal';
import styles from './grid-detail.element.scss';

export class CdsGridDetail extends LitElement {
  @property({ type: String, reflect: true }) slot = 'detail';

  @property({ type: Boolean }) hidden = false;

  @property({ type: String }) anchor = '';

  static styles = [baseStyles, styles];

  private get anchorElement() {
    return (this.getRootNode() as HTMLElement).querySelector<HTMLElement>(`#${this.anchor}`);
  }

  private get dialog() {
    return this.shadowRoot.querySelector('dialog');
  }

  render() {
    return html`
      <dialog tabindex="0">
        <div class="caret"></div>
        <slot></slot>
        <cds-action shape="times" @click=${this.close} aria-label="close row details"></cds-action>
      </dialog>
    `;
  }

  firstUpdated(props: Map<string, any>) {
    super.firstUpdated(props);

    this.dialog.addEventListener('close', () => {
      if (!this.hidden) {
        this.close();
      }
    });

    this.getRootNode().addEventListener('keydown', (e: any) => {
      if (e.code === 'Escape') {
        e.preventDefault();
        this.close();
      }
    });
  }

  async updated(props: Map<string, any>) {
    super.updated(props);

    if (props.has('hidden') && props.get('hidden') !== undefined && props.get('hidden') !== this.hidden) {
      if (this.hidden) {
        this.dialog.close();
      } else {
        const focusableItem = getTabableItems(this)[0] as HTMLElement;

        if (focusableItem) {
          focusableItem.focus();
        } else {
          this.dialog.focus();
        }
      }
    }

    if (props.has('anchor')) {
      await this.updateComplete;
      this.style.setProperty(
        '--caret-top',
        `${this.anchorElement?.getBoundingClientRect()?.top - this.dialog.getBoundingClientRect().top}px`
      );
      this.parentElement.style.setProperty('--body-overflow', this.hidden ? 'auto' : 'hidden');
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.close();
  }

  private close() {
    this.dispatchEvent(new CustomEvent('closeChange'));
    this.anchorElement?.focus();
    this.parentElement.style.setProperty('--body-overflow', 'auto');
  }
}
