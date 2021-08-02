/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html } from 'lit';
import { i18n, I18nService, property, state } from '@cds/core/internal';
import { CdsAction } from './action.element.js';
import styles from './action-expand.element.scss';

// const expandShapes = {
//   'vertical': 'angle',
//   'horizontal': 'angle',
//   'detail': 'detail-expand',
//   'detailCollapse': 'detail-collapse'
// };

/**
 * Action Expand Button
 *
 * ```typescript
 * import '@cds/core/actions/register.js';
 * ```
 *
 * ```html
 * <cds-action-expand expanded></cds-action-expand>
 * ```
 * @internal
 * @element cds-action-expand
 * @slot - For projecting text content or cds-icon
 */
export class CdsActionExpand extends CdsAction {
  @property({ type: Boolean, reflect: false }) expanded = false;

  @property({ type: String }) action: 'vertical' | 'horizontal' | 'detail' = 'vertical';

  @i18n() i18n = I18nService.keys.actions;

  @state({ type: String, reflect: true, attribute: 'aria-expanded' }) protected ariaExpanded?: string;

  @state({ type: String, reflect: true, attribute: 'aria-haspopup' }) protected ariaHasPopup?: string;

  static get styles() {
    return [super.styles, styles];
  }

  private get iconDirection() {
    if (this.action === 'vertical') {
      return this.expanded ? 'down' : 'right';
    } else if (this.action === 'horizontal') {
      return this.expanded ? 'left' : 'right';
    } else {
      return null;
    }
  }

  private get iconShape() {
    if (this.action === 'detail') {
      return this.expanded ? 'detail-collapse' : 'detail-expand';
    } else {
      return 'angle';
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.ariaLabel = this.i18n.expand;
  }

  render() {
    return html`
      <div class="private-host">
        <cds-icon .shape=${this.iconShape} .direction=${this.iconDirection}></cds-icon>
      </div>
    `;
  }

  updated(props: Map<string, any>) {
    super.updated(props);
    this.ariaExpanded = `${this.expanded}`;
    this.ariaLabel = this.expanded ? this.i18n.close : this.i18n.expand;
    this.ariaHasPopup = this.action === 'detail' ? 'true' : null;
  }
}
