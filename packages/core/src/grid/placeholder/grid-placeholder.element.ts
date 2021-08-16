import { LitElement, html } from 'lit';
import { baseStyles, state } from '@cds/core/internal';
import styles from './grid-placeholder.element.scss';

export class CdsGridPlaceholder extends LitElement {
  @state({ type: String, reflect: true, attribute: 'slot' }) slot = 'placeholder';

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div role="row">
        <div role="cell" part="placeholder" cds-layout="vertical gap:lg align:center">
          <slot><cds-icon shape="filter" size="xl"></cds-icon></slot>
        </div>
      </div>
    `;
  }
}
