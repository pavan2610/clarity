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
  ResponsiveController,
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

  @property({ type: String }) border: 'row' | 'cell' | 'column' | 'none' | 'stripe' = 'row';

  @property({ type: Boolean }) rangeSelection = true;

  @state({ type: String, reflect: true }) protected _id = createId();

  @query('.row-group', true) readonly rowGroup: HTMLElement;

  @query('.column-row', true) readonly columnRow: HTMLElement;
  
  @query('.column-group', true) readonly columnGroup: HTMLElement;

  @querySlotAll('cds-grid-row') readonly rows: NodeListOf<CdsGridRow>;
  
  @querySlotAll('cds-grid-cell') readonly cells: NodeListOf<CdsGridCell>;
  
  @querySlotAll('cds-grid-column') readonly columns: NodeListOf<CdsGridColumn>;

  protected ariaGridController = new AriaGridController(this);

  protected responsiveController = new ResponsiveController(this);

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
