import { LitElement, html } from 'lit';
import { queryAssignedNodes } from 'lit/decorators/query-assigned-nodes.js';
import { eventOptions } from 'lit/decorators/event-options.js';
import { query } from 'lit/decorators/query.js';
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
import { GridColumnGroupSizeController } from './grid-column-group-size.controller.js';
import styles from './grid.element.scss';
import { GridA11yController } from './grid-a11y.controller.js';
import { GridRangeSelectionController } from './grid-range-selection.controller.js';

export class CdsGrid extends LitElement {
  @property({ type: String }) columnLayout: 'fixed' | 'flex' = 'fixed';

  @property({ type: Boolean }) rangeSelection = true;

  @state({ type: String, reflect: true }) protected _id = createId();

  @state({ type: Number }) rowCount = 0;

  @state({ type: Number }) colCount = 0;

  /** @private */
  @queryAssignedNodes('columns', true, 'cds-grid-column') columns: NodeListOf<CdsGridColumn>;

  /** @private */
  @queryAssignedNodes('', true, 'cds-grid-row') rows: NodeListOf<CdsGridRow>;

  /** @private */
  @query('.grid-body') grid: HTMLElement;

  protected gridA11yController = new GridA11yController(this);

  protected gridRangeSelectionController = new GridRangeSelectionController(this);

  protected gridColumnGroupSizeController = new GridColumnGroupSizeController(this);

  protected gridKeyNavigationController = new KeyNavigationGridController(this, {
    keyGridRows: 'rows',
    keyGridCells: 'cells',
    keyGrid: 'grid',
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

  /** @private */
  get cells(): CdsGridCell[] {
    return Array.from(this.rows)
      .map(r => (r.cells ? Array.from(r.cells) : []))
      .flat();
  }

  render() {
    return html`
      <div class="private-host">
        <div class="grid" @scroll=${this.setContentVisibitity}>
          <div role="rowgroup" class="column-row-group">
            <div role="row" @mousedown=${this.initializeColumnWidths} @keydown=${this.initializeColumnWidths}>
              <slot name="columns" @slotchange=${this.createColumnGrids}></slot>
            </div>
          </div>
          <div class="grid-body" role="rowgroup">
            <slot @slotchange=${this.updateRows}></slot><slot name="placeholder"></slot>
          </div>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
        <slot name="detail"></slot>
      </div>
    `;
  }

  private async updateRows() {
    this.rowCount = this.rows.length;
    this.colCount = this.columns.length;
    this.rows.forEach((r, i) => (r.rowIndex = i + 1));
    this.columns.forEach((c, i) => (c.colIndex = i + 1));
    await this.updateComplete;
    this.gridKeyNavigationController.initializeKeyGrid();
  }

  @eventOptions({ once: true })
  private setContentVisibitity() {
    this.style.setProperty('--row-content-visibility', 'visible'); // rows default to 'auto' for initial render, on scroll eager render to prevent cliping
  }

  @eventOptions({ once: true })
  private initializeColumnWidths() {
    this.gridColumnGroupSizeController.initializeColumnWidths();
    this.columns.forEach((c: any) => c.gridColumnSizeController.initializeResizer());
  }

  private createColumnGrids() {
    this.gridColumnGroupSizeController.createColumnGrids();
  }
}
