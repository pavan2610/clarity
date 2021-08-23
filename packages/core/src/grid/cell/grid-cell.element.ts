import { LitElement, html } from 'lit';
import { baseStyles, AriaReflectionController } from '@cds/core/internal';
import styles from './grid-cell.element.scss';

export class CdsGridCell extends LitElement {
  protected ariaReflectionController = new AriaReflectionController(this);

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="cell" focusable>
        <slot></slot>
      </div>
    `;
  }
}
