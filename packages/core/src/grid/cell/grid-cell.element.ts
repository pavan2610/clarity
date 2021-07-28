import { LitElement, html } from 'lit';
import { baseStyles, property, state } from '@cds/core/internal';
import { GridCellA11yController } from './grid-cell-a11y.controller.js';
import styles from './grid-cell.element.scss';

export class CdsGridCell extends LitElement {
  @state({ type: Number }) colIndex: number;

  @property({ type: Boolean }) selected: boolean;

  @property({ type: String }) type: 'default' | 'action';

  @state({ type: Boolean, reflect: true }) active: boolean;

  /** private */
  get rowIndex() {
    return parseInt(this.parentElement.getAttribute('aria-rowindex'));
  }

  static styles = [baseStyles, styles];

  protected gridCellA11yController = new GridCellA11yController(this);

  render() {
    return html`
      <div part="cell" focusable>
        <slot></slot>
      </div>
    `;
  }
}
