import { LitElement, html } from 'lit';
import { baseStyles, property } from '@cds/core/internal';
import { CdsGridCell } from '../cell/grid-cell.element.js';
import { GridRowPositionController } from './grid-row-position.controller.js';
import styles from './grid-row.element.scss';

export class CdsGridRow extends LitElement {
  @property({ type: Boolean }) selected: boolean;

  @property({ type: String }) position: 'fixed' | 'sticky' | '';

  protected gridRowPositionController = new GridRowPositionController(this);

  static styles = [baseStyles, styles];

  /** @private */
  get cells() {
    return this.querySelectorAll<CdsGridCell>('cds-grid-cell');
  }

  render() {
    return html`
      <div part="row">
        <slot></slot>
      </div>
    `;
  }
}
