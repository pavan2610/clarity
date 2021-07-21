/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html } from 'lit';
import { i18n, I18nService, property } from '@cds/core/internal';
import { CdsAction } from './action.element.js';
import styles from './action-expand.element.scss';

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
  @property({ type: Boolean }) expanded = false;

  @property({ type: String }) direction: 'main' | 'cross' = 'cross';

  @i18n() i18n = I18nService.keys.actions;

  static get styles() {
    return [super.styles, styles];
  }

  private get iconDirection() {
    if (this.direction === 'main') {
      return this.expanded ? 'down' : 'right';
    } else {
      return this.expanded ? 'left' : 'right';
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.shape = 'angle';
    this.ariaLabel = this.i18n.expand;
  }

  render() {
    return html`
      <div class="private-host">
        <cds-icon .shape=${this.shape} .direction=${this.iconDirection}></cds-icon>
      </div>
    `;
  }

  updated(props: Map<string, any>) {
    super.updated(props);
    this.setAttribute('aria-expanded', `${this.expanded}`);
    this.ariaLabel = this.expanded ? this.i18n.close : this.i18n.expand;
  }
}
