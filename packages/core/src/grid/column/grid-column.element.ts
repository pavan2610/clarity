import { LitElement, html } from 'lit';
import { baseStyles, i18n, I18nService, property, state } from '@cds/core/internal';
import { GridColumnSizeController } from './grid-column-size.controller.js';
import { GridColumnPositionController } from './grid-column-position.controller.js';
import styles from './grid-column.element.scss';

export class CdsGridColumn extends LitElement {
  @i18n() i18n = I18nService.keys.grid;

  @property({ type: String }) width?: string;

  @property({ type: String }) type: 'default' | 'action';

  @property({ type: String }) resizable: true | false | 'hidden' = false;

  @property({ type: String }) position: 'initial' | 'sticky' | 'fixed' = 'initial';

  @state({ type: String, attribute: 'slot', reflect: true }) slot = 'columns';

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
          ? html` <cds-action-resize .readonly=${this.resizable === false}></cds-action-resize>
              <div class="line"></div>`
          : ''}
      </div>
    `;
  }
}
