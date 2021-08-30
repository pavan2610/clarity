import { LitElement, html } from 'lit';
import { baseStyles } from '@cds/core/internal';
import styles from './grid-cell.element.scss';

/**
 * Grid Cell
 *
 * ```typescript
 * import '@cds/core/grid/register.js';
 * ```
 * 
 * @element cds-grid-cell
 */
export class CdsGridCell extends LitElement {
  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="cell" focusable>
        <slot></slot>
      </div>
    `;
  }
}
