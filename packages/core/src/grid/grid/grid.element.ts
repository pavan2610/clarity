import { LitElement, html } from 'lit';
import { query } from 'lit/decorators/query.js';
import {
  baseStyles,
  createId,
  state,
  property,
  DraggableListController,
  KeyNavigationGridController,
  AriaGridController,
  querySlotAll,
} from '@cds/core/internal';
import { CdsGridRow } from '../row/grid-row.element.js';
import { CdsGridCell } from '../cell/grid-cell.element.js';
import { CdsGridColumn } from '../column/grid-column.element.js';
import { GridRowVisibilityController } from '../row/grid-row-visibility.controller.js';
import { GridColumnGroupSizeController } from '../column/grid-column-group-size.controller.js';
import { GridRangeSelectionController } from './grid-range-selection.controller.js';
import styles from './grid.element.scss';

export class CdsGrid extends LitElement {
  @property({ type: String }) columnLayout: 'fixed' | 'flex' = 'fixed';

  @property({ type: String }) border: 'row' | 'cell' | 'column' | 'none' = 'row';

  @property({ type: Boolean }) rangeSelection = true;

  @state({ type: String, reflect: true }) protected _id = createId();

  /** @private */
  @querySlotAll('cds-grid-column') columns: NodeListOf<CdsGridColumn>;

  /** @private */
  @querySlotAll('cds-grid-row') rows: NodeListOf<CdsGridRow>;

  /** @private */
  @querySlotAll('cds-grid-cell') cells: NodeListOf<CdsGridCell>;

  /** @private */
  @query('.row-group', true) rowGroup: HTMLElement;

  /** @private */
  @query('.column-group', true) columnGroup: HTMLElement;

  /** @private */
  @query('.column-row', true) columnRow: HTMLElement;

  protected ariaGridController = new AriaGridController(this);

  protected gridRowVisibilityController = new GridRowVisibilityController(this);

  protected gridRangeSelectionController = new GridRangeSelectionController(this);

  protected gridColumnGroupSizeController = new GridColumnGroupSizeController(this);

  protected keyNavigationGridController = new KeyNavigationGridController(this, {
    keyGridRows: 'rows',
    keyGridCells: 'cells',
    keyGrid: 'rowGroup',
  });

  protected draggableColumnController = new DraggableListController(this, {
    layout: 'horizontal',
    item: 'cds-grid-column',
    dropZone: 'cds-grid-column',
  });

  protected draggableListController = new DraggableListController(this, {
    layout: 'vertical',
    item: 'cds-grid-row',
    dropZone: 'cds-grid-placeholder',
    manageFocus: false,
  });

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div class="private-host">
        <div class="scroll-container">
          <div class="column-group">
            <div class="column-row">
              <slot name="columns"></slot>
            </div>
          </div>
          <div class="row-group">
            <slot></slot>
            <slot name="placeholder"></slot>
          </div>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
        <slot name="detail"></slot>
      </div>
    `;
  }
}
