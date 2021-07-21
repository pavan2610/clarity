/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import '@cds/core/actions/register.js';
import { baseStyles, registerElementSafely, state } from '@cds/core/internal';
import { html, LitElement } from 'lit';
import { ClarityIcons } from '@cds/core/icon/icon.service.js';
import { timesIcon } from '@cds/core/icon/shapes/times.js';
import { barsIcon } from '@cds/core/icon/shapes/bars.js';

ClarityIcons.addIcons(timesIcon, barsIcon);

export default {
  title: 'Stories/Actions',
  component: 'cds-action',
  parameters: {
    options: { showPanel: true },
  },
};

export function action() {
  return html`
    <div cds-layout="horizontal gap:lg">
      <cds-action aria-label="open options"></cds-action>
      <cds-action aria-label="open menu" shape="bars"></cds-action>
    </div>
  `;
}

export function actionResize() {
  return html`
    <div cds-layout="horizontal gap:xl">
      <cds-action-resize direction="cross" aria-label="resize column"></cds-action-resize>
      <cds-action-resize direction="main" aria-label="resize column"></cds-action-resize>
    </div>
  `;
}

export function actionSort() {
  class DemoActionSort extends LitElement {
    @state() private sort: 'none' | 'ascending' | 'descending' = 'none';

    render() {
      return html`<cds-action-sort
        .sort=${this.sort}
        @sortChange=${(e: any) => (this.sort = e.detail)}
        aria-label="sort column"
      ></cds-action-sort>`;
    }
  }

  registerElementSafely('demo-action-sort', DemoActionSort);
  return html`<demo-action-sort></demo-action-sort>`;
}

export function actionHandle() {
  return html`<cds-action-handle aria-label="sort item"></cds-action-handle>`;
}

export function actionExpand() {
  class DemoActionExpand extends LitElement {
    static styles = [baseStyles];
    @state() private expandOne = false;
    @state() private expandTwo = false;

    render() {
      return html`
        <div cds-layout="vertical gap:lg">
          <cds-action-expand
            .expanded=${this.expandOne}
            @click=${() => (this.expandOne = !this.expandOne)}
          ></cds-action-expand>
          <cds-action-expand
            direction="main"
            .expanded=${this.expandTwo}
            @click=${() => (this.expandTwo = !this.expandTwo)}
          ></cds-action-expand>
        </div>
      `;
    }
  }

  registerElementSafely('demo-action-expand', DemoActionExpand);
  return html`<demo-action-expand></demo-action-expand>`;
}

export function actionVisibility() {
  return html``;
}

export function actionClose() {
  return html``;
}
