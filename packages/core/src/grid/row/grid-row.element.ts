import { LitElement, html } from 'lit';
import { baseStyles, property, querySlotAll } from '@cds/core/internal';
import { CdsGridCell } from '../cell/grid-cell.element.js';
import { GridRowPositionController } from './grid-row-position.controller.js';
import styles from './grid-row.element.scss';

export class CdsGridRow extends LitElement {
  @property({ type: Boolean }) selected: boolean;

  @property({ type: String }) position: 'fixed' | 'sticky' | '';

  @querySlotAll('cds-grid-cell') cells: NodeListOf<CdsGridCell>;

  protected gridRowPositionController = new GridRowPositionController(this);

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="row">
        <slot></slot>
      </div>
    `;
  }
}