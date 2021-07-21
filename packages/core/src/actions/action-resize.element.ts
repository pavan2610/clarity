/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html } from 'lit';
import { i18n, I18nService, state, event, EventEmitter, property } from '@cds/core/internal';
import { CdsAction } from './action.element.js';
import styles from './action-resize.element.scss';

/**
 * Action Button
 *
 * ```typescript
 * import '@cds/core/actions/register.js';
 * ```
 *
 * ```html
 * <cds-action-resize></cds-action-resize>
 * ```
 * @internal
 * @element cds-action-resize
 * @slot - For projecting text content or cds-icon
 */
export class CdsActionResize extends CdsAction {
  @property({ type: String }) direction: 'main' | 'cross' = 'cross';

  @event() resizeChange: EventEmitter<number>;

  @state({ type: Boolean, reflect: true }) protected keyActive = false;

  @i18n() i18n = I18nService.keys.actions;

  static get styles() {
    return [super.styles, styles];
  }

  render() {
    return html`
      <div class="private-host">
        <div class="handle"></div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.ariaLabel = this.i18n.resize;
  }

  firstUpdated(props: Map<string, any>) {
    super.firstUpdated(props);

    if (!this.readonly) {
      this.listenForMouseResize();
      this.listenForKeyboardResize();
      this.addEventListener('blur', () => (this.keyActive = false));
    }
  }

  private listenForMouseResize() {
    const host = this;
    let m_pos: any;
    this.addEventListener(
      'mousedown',
      (e: any) => {
        m_pos = e.x;
        document.addEventListener('mousemove', resize, false);
      },
      false
    );

    document.addEventListener('mouseup', () => document.removeEventListener('mousemove', resize, false), false);

    function resize(e: any) {
      requestAnimationFrame(() => {
        const dx = m_pos - e.x;
        m_pos = e.x;
        host.resizeChange.emit(-dx, { bubbles: true });
      });
    }
  }

  private listenForKeyboardResize() {
    this.addEventListener('keydown', (e: any) => {
      if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
        e.preventDefault();
        this.keyActive = true;
        requestAnimationFrame(() => this.resizeChange.emit(e.code === 'ArrowLeft' ? -10 : 10, { bubbles: true }));
      }
    });
  }
}
