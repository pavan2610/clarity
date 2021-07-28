import { LitElement, html } from 'lit';
import { query } from 'lit/decorators/query.js';
import { baseStyles, i18n, I18nService, property, state } from '@cds/core/internal';
import styles from './grid-column.element.scss';
import { GridColumnSizeController } from './grid-column-size.controller.js';
import { GridColumnA11yController } from './grid-column-a11y.controller.js';
import { GridColumnPositionController } from './grid-column-position.controller.js';
import { CdsActionResize } from '@cds/core/actions';

export class CdsGridColumn extends LitElement {
  @i18n() i18n = I18nService.keys.grid;

  @property({ type: String }) resizable: true | false | 'hidden' = false;

  @property({ type: String }) width?: string;

  @property({ type: String }) position: 'initial' | 'sticky' | 'fixed' = 'initial';

  @property({ type: String }) type: 'default' | 'action';

  @state({ type: Number }) colIndex: number;

  @state({ type: String, attribute: 'slot', reflect: true }) slot = 'columns';

  /** @private */
  @query('cds-action-resize') resizeHandle: CdsActionResize;

  protected gridColumnSizeController = new GridColumnSizeController(this);

  protected gridColumnA11yController = new GridColumnA11yController(this);

  protected gridColumnPositionController = new GridColumnPositionController(this);

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="column">
        <slot></slot>
        ${this.resizable !== 'hidden'
          ? html`<cds-action-resize
                .readonly=${this.resizable === false}
                aria-label=${this.i18n.resizeColumn}
              ></cds-action-resize>
              <div class="line"></div>`
          : ''}
      </div>
    `;
  }

  async updated(props: Map<string, any>) {
    super.updated(props);

    if (
      (this.colIndex !== undefined && this.position !== undefined && props.get('position')) ||
      (this.colIndex !== undefined && this.position !== 'initial')
    ) {
      this.gridColumnPositionController.calculateColumnPositionStyles();
    }
  }
}
