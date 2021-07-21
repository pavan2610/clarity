/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html } from 'lit';
import { property, baseStyles, CdsBaseButton, LogService, state } from '@cds/core/internal';
import styles from './action.element.scss';

/**
 * Action Button
 *
 * ```typescript
 * import '@cds/core/actions/register.js';
 * ```
 *
 * ```html
 * <cds-action></cds-action>
 * ```
 * @internal
 * @element cds-action
 * @slot - For projecting text content or cds-icon
 */
export class CdsAction extends CdsBaseButton {
  @property({ type: String }) shape = 'ellipsis-vertical';

  @property({ type: String }) ariaLabel?: string;

  @state({ type: Boolean, reflect: true, attribute: 'cds-action' }) cdsAction = true;

  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html`
      <div class="private-host">
        <slot><cds-icon .shape=${this.shape}></cds-icon></slot>
      </div>
    `;
  }

  updated(props: Map<string, any>) {
    super.updated(props);

    if (!this.ariaLabel && !this.readonly) {
      LogService.warn('A aria-label is required for interactive cds-action type', this);
    }
  }
}
