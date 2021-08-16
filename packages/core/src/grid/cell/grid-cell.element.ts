import { LitElement, html } from 'lit';
import { baseStyles, property, state } from '@cds/core/internal';
import styles from './grid-cell.element.scss';

export class CdsGridCell extends LitElement {
  @property({ type: String }) type: 'default' | 'action';

  @state({ type: Boolean, reflect: true }) active: boolean;

  get rowIndex() {
    return parseInt(this.parentElement.getAttribute('aria-rowindex'));
  }

  get colIndex() {
    return parseInt(this.getAttribute('aria-colindex'));
  }

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="cell" focusable>
        <slot></slot>
      </div>
    `;
  }
}
