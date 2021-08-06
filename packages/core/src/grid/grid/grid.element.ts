import { LitElement, html } from 'lit';
import { query } from 'lit/decorators/query.js';
import { queryAssignedNodes } from 'lit/decorators/query-assigned-nodes.js';
import {
  baseStyles,
  createId,
  state,
  property,
  DraggableListController,
  KeyNavigationGridController,
} from '@cds/core/internal';
import { CdsGridRow } from '../row/grid-row.element.js';
import { CdsGridCell } from '../cell/grid-cell.element.js';
import { CdsGridColumn } from '../column/grid-column.element.js';
import { GridColumnGroupSizeController } from '../column/grid-column-group-size.controller.js';
import { GridA11yController } from './grid-a11y.controller.js';
import { GridRangeSelectionController } from './grid-range-selection.controller.js';
import styles from './grid.element.scss';

export class CdsGrid extends LitElement {
  @property({ type: String }) columnLayout: 'fixed' | 'flex' = 'fixed';

  @property({ type: String }) border: 'row' | 'cell' | 'column' | 'none' = 'row';

  @property({ type: Boolean }) rangeSelection = true;

  @state({ type: String, reflect: true }) protected _id = createId();

  /** @private */
  @queryAssignedNodes('columns', true, 'cds-grid-column') columns: NodeListOf<CdsGridColumn>;

  /** @private */
  @queryAssignedNodes('', true, 'cds-grid-row') rows: NodeListOf<CdsGridRow>;

  /** @private */
  @query('.grid-body', true) protected gridBody: HTMLElement;

  /** @private */
  get cells(): NodeListOf<CdsGridCell> {
    return this.querySelectorAll('cds-grid-cell');
  }

  protected gridA11yController = new GridA11yController(this);

  protected gridRangeSelectionController = new GridRangeSelectionController(this);

  protected gridColumnGroupSizeController = new GridColumnGroupSizeController(this);

  protected keyNavigationGridController = new KeyNavigationGridController(this, {
    keyGridRows: 'rows',
    keyGridCells: 'cells',
    keyGrid: 'gridBody',
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
          <div role="rowgroup">
            <div role="row" aria-rowindex="1">
              <slot name="columns"></slot>
            </div>
          </div>
          <div class="grid-body" role="rowgroup">
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
