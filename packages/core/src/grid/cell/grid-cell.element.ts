import { LitElement, html } from 'lit';
import { baseStyles, property } from '@cds/core/internal';
import styles from './grid-cell.element.scss';

/**
 * Grid Cell
 *
 * ```typescript
 * import '@cds/core/grid/register.js';
 * ```
 *
 * @element cds-grid-cell
 * @csspart cell
 * @cssprop --border-right
 * @cssprop --border-left
 * @cssprop --min-height
 * @cssprop --min-width
 * @cssprop --font-size
 * @cssprop --justify-content
 * @cssprop --padding-block
 * @cssprop --padding-inline-start
 * @cssprop --padding-inline-end
 * @cssprop --color
 */
export class CdsGridCell extends LitElement {
  @property({ type: String }) type: 'action' | '' | null; // todo update to column style inheritance

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="cell" focusable>
        <slot></slot>
      </div>
    `;
  }
}
