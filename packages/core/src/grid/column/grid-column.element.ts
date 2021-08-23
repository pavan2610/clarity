import { LitElement, html } from 'lit';
import {
  baseStyles,
  i18n,
  I18nService,
  property,
  state,
  HiddenController,
  AriaReflectionController,
} from '@cds/core/internal';
import { GridColumnSizeController } from './grid-column-size.controller.js';
import { GridColumnPositionController } from './grid-column-position.controller.js';
import styles from './grid-column.element.scss';

export class CdsGridColumn extends LitElement {
  @i18n() i18n = I18nService.keys.grid;

  @property({ type: String }) width?: string;

  @property({ type: String }) type: '' | 'action';

  @property({ type: Boolean }) resizable = false;

  @property({ type: String }) position: '' | 'sticky' | 'fixed' = '';

  @state({ type: String, attribute: 'slot', reflect: true }) slot = 'columns';

  protected hiddenController = new HiddenController(this);

  protected ariaReflectionController = new AriaReflectionController(this);

  protected gridColumnSizeController = new GridColumnSizeController(this);

  protected gridColumnPositionController = new GridColumnPositionController(this);

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="column">
        <slot></slot>
        <cds-action-resize .readonly=${this.resizable === false}></cds-action-resize>
        <div class="line"></div>
      </div>
    `;
  }
}
