/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement, render } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { property, state } from '../decorators/property.js';
import { querySlot } from '../decorators/query-slot.js';
import { onAnyKey } from '../utils/keycodes.js';
import { stopEvent } from './../utils/events.js';
import { AriaPopupTriggerController } from '../controllers/aria-popup-trigger.controller.js';
import { ActiveInteractionController } from '../controllers/active-interaction.controller.js';
import { AriaReflectionController } from '../controllers/aria-reflection.controller.js';

// @dynamic
export class CdsBaseButton extends LitElement {
  @property({ type: Boolean }) readonly = false;

  @property({ type: String }) type: 'button' | 'submit';

  @property({ type: String }) name: string;

  @property({ type: String }) value: string;

  @property({ type: Boolean }) disabled = false;

  @state({ type: Number, attribute: 'tabindex', reflect: true }) protected tabIndexAttr: number | null; // don't override native prop as it stops native focus behavior

  @state({ type: Boolean, reflect: true }) protected focused = false;

  @state({ type: String, reflect: true, attribute: 'role' }) role: string | null = 'button';

  @state({ type: Boolean, reflect: true }) protected isAnchor = false;

  @querySlot('cds-icon') protected icon: HTMLElement;

  @querySlot('cds-badge') protected badge: HTMLElement;

  protected ariaPopupAnchorController = new AriaPopupTriggerController(this);

  protected ariaReflectionController = new AriaReflectionController(this);

  protected activeInteractionController = new ActiveInteractionController(this);

  protected render() {
    return html` <slot></slot> `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.tabIndex = 0; // initialize immediately so button can be focused synchronously
  }

  protected updated(props: Map<string, any>) {
    super.updated(props);
    this.updateButtonAttributes();

    if (props.has('readonly')) {
      this.setupNativeButtonBehavior();
    }
  }

  private setupNativeButtonBehavior() {
    if (this.readonly) {
      this.removeEventListener('click', this.triggerNativeButtonBehavior);
      this.removeEventListener('keyup', this.emulateKeyBoardEventBehavior);
    } else {
      this.addEventListener('click', this.triggerNativeButtonBehavior);
      this.addEventListener('keyup', this.emulateKeyBoardEventBehavior);
    }
  }

  /**
   * We have to append a hidden button outside the web component in the light DOM
   * This allows us to trigger native submit events within a form element.
   */
  private triggerNativeButtonBehavior(event: any) {
    if (!this.readonly) {
      if (this.disabled) {
        stopEvent(event);
      } else if (!event.defaultPrevented) {
        const buttonTemplate = html`<button
          aria-hidden="true"
          ?disabled="${this.disabled}"
          tabindex="-1"
          style="display: none !important"
          value="${ifDefined(this.value)}"
          name="${ifDefined(this.name)}"
          type="${ifDefined(this.type)}"
        ></button>`;

        const marker = document.createElement('div');
        this.appendChild(marker);
        render(buttonTemplate, marker);
        this.querySelector('button[aria-hidden]')?.dispatchEvent(
          new MouseEvent('click', { relatedTarget: this, composed: true })
        );
        marker.remove();
      }
    }
  }

  private emulateKeyBoardEventBehavior(evt: any) {
    onAnyKey(['enter', 'space'], evt, () => {
      if (!this.readonly) {
        this.click();
        stopEvent(evt);
      }
    });
  }

  private updateButtonAttributes() {
    this.isAnchor = this.parentElement?.tagName === 'A';

    if (this.isAnchor && this.parentElement) {
      this.parentElement.style.lineHeight = '0';
      this.parentElement.style.textDecoration = 'none'; // fixes issue when style is applied to text node
    }

    this.readonly = this.readonly || this.isAnchor;

    if (this.readonly) {
      this.role = null;
      this.tabIndexAttr = null;
      this.ariaDisabled = null;
    } else {
      this.role = 'button';
      this.tabIndexAttr = this.disabled ? -1 : 0;
      this.ariaDisabled = this.disabled ? 'true' : 'false';
    }
  }
}
