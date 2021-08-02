import { LitElement, html } from 'lit';
import { query } from 'lit/decorators/query.js';
import { queryAssignedNodes } from 'lit/decorators/query-assigned-nodes.js';
import { eventOptions } from 'lit/decorators/event-options.js';
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
import styles from './grid.element.scss';
import { GridA11yController } from './grid-a11y.controller.js';
import { GridRangeSelectionController } from './grid-range-selection.controller.js';

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

  protected gridKeyNavigationController = new KeyNavigationGridController(this, {
    keyGridRows: 'rows',
    keyGridCells: 'cells',
    keyGrid: 'gridBody',
  });

  protected draggableColumnController = new DraggableListController(this, {
    layout: 'horizontal',
    item: 'cds-grid-column',
    dropZone: 'cds-grid-column',
  });

  protected draggableRowController = new DraggableListController(this, {
    layout: 'vertical',
    item: 'cds-grid-row',
    dropZone: 'cds-grid-placeholder',
    manageFocus: false,
  });

  static styles = [baseStyles, styles];

  private rowInteractionsInitialized = false;
  private columnsInitialized = false;
  private rowsInitialized = false;

  render() {
    return html`
      <div
        class="private-host"
        @mouseover=${this.initializeRowInteractions}
        @mousedown=${this.initializeRowInteractions}
        @keydown=${this.initializeRowInteractions}
        @focus=${this.initializeRowInteractions}
      >
        <div class="grid">
          <div role="rowgroup" class="column-row-group">
            <div
              role="row"
              aria-rowindex="1"
              @mousedown=${this.initializeColumnInteractions}
              @keydown=${this.initializeColumnInteractions}
            >
              <slot name="columns"></slot>
            </div>
          </div>
          <div class="grid-body" role="rowgroup"><slot></slot><slot name="placeholder"></slot></div>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
        <slot name="detail"></slot>
      </div>
    `;
  }

  firstUpdated(props: Map<string, any>) {
    super.firstUpdated(props);

    this.shadowRoot.addEventListener('slotchange', (e: any) => {
      if (this.columnsAndRowsHaveInitialized(e.target.getAttribute('name'))) {
        this.gridA11yController.initialize();
        this.gridColumnGroupSizeController.createColumnGrids();

        if (this.rowInteractionsInitialized) {
          this.gridKeyNavigationController.initialize();
        }
      }
    });
  }

  @eventOptions({ once: true })
  private initializeRowInteractions() {
    if (!this.rowInteractionsInitialized) {
      this.gridKeyNavigationController.initialize();
      this.gridRangeSelectionController.initialize();
      this.draggableRowController.initialize();
      this.rowInteractionsInitialized = true;
    }
  }

  @eventOptions({ once: true })
  private initializeColumnInteractions() {
    this.gridColumnGroupSizeController.initializeColumnWidths();
    this.draggableColumnController.initialize();
    this.columns.forEach((c: any) => c.gridColumnSizeController.initialize());
  }

  private columnsAndRowsHaveInitialized(slotName: string) {
    if (slotName === 'columns') {
      this.columnsInitialized = true;
    }

    if (slotName === null) {
      this.rowsInitialized = true;
    }

    return (slotName === null || slotName === 'columns') && this.columnsInitialized && this.rowsInitialized;
  }
}
