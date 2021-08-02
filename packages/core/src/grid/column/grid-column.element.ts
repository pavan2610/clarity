import { LitElement, html } from 'lit';
import { query } from 'lit/decorators/query.js';
import { baseStyles, i18n, I18nService, property, state } from '@cds/core/internal';
import styles from './grid-column.element.scss';
import { GridColumnSizeController } from './grid-column-size.controller.js';
import { GridColumnPositionController } from './grid-column-position.controller.js';
import { CdsActionResize } from '@cds/core/actions';

export class CdsGridColumn extends LitElement {
  @i18n() i18n = I18nService.keys.grid;

  @property({ type: String }) width?: string;

  @property({ type: String }) type: 'default' | 'action';

  @property({ type: String }) resizable: true | false | 'hidden' = false;

  @property({ type: String }) position: 'initial' | 'sticky' | 'fixed' = 'initial';

  @state({ type: String, attribute: 'slot', reflect: true }) slot = 'columns';

  /** @private */
  @query('cds-action-resize') resizeHandle: CdsActionResize;

  /** @private */
  get colIndex() {
    return parseInt(this.getAttribute('aria-colindex'));
  }

  protected gridColumnSizeController = new GridColumnSizeController(this);

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

    await this.updateComplete;
    if (
      (this.colIndex && this.position !== undefined && props.get('position')) ||
      (this.colIndex && this.position !== 'initial')
    ) {
      this.gridColumnPositionController.calculateColumnPositionStyles();
    }
  }
}
