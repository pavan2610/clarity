import { LitElement, html } from 'lit';
import { baseStyles, state } from '@cds/core/internal';
import styles from './grid-footer.element.scss';

/**
 * Grid Footer
 *
 * ```typescript
 * import '@cds/core/grid/register.js';
 * ```
 * 
 * @element cds-grid-footer
 */
export class CdsGridFooter extends LitElement {
  @state({ type: String, reflect: true, attribute: 'slot' }) slot = 'footer';

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div class="private-host">
        <slot></slot>
      </div>
    `;
  }
}
