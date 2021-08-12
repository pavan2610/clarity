/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { css, html, LitElement } from 'lit';
import { query } from 'lit/decorators/query.js';
import { queryAll } from 'lit/decorators/query-all.js';
import {
  baseStyles,
  DraggableListController,
  AriaGridController,
  KeyNavigationGridController,
  KeyNavigationListController,
  registerElementSafely,
  state,
  AriaPopupController,
  AriaPopupTriggerController,
  property,
} from '@cds/core/internal';
import '@cds/core/badge/register.js';
import { swapItems } from '@cds/core/demo';

export default {
  title: 'Internal Stories/Controllers',
};

export function keyNavigationListController() {
  class DemoKeyNavigationList extends LitElement {
    static get styles() {
      return [
        baseStyles,
        css`
          section {
            display: flex;
            gap: 4px;
          }

          [selected] {
            background: var(--cds-alias-status-success);
            color: var(--cds-global-color-white);
          }

          section button {
            width: 50px;
            height: 30px;
            display: block;
          }

          button[tabindex='0']:focus {
            outline: 5px auto Highlight;
            outline: 5px auto -webkit-focus-ring-color;
          }
        `,
      ];
    }

    @state() private items = Array.from(Array(10).keys());
    @state() private selected = '0';
    @state() private active = '';

    @queryAll('section > div') keyListItems: NodeListOf<HTMLElement>;
    protected keyNavigationListController = new KeyNavigationListController(this);

    render() {
      return html`
        <div cds-layout="vertical gap:md">
          <div cds-layout="vertical gap:md">
            <p cds-text="body">Selected: ${this.selected}</p>
            <p cds-text="body">Active: ${this.active}</p>
            <section @cdsKeyChange=${(e: any) => (this.active = e.detail.activeItem.textContent)}>
              ${this.items.map(
                i =>
                  html`<div>
                    <button
                      ?selected=${this.selected === `${i}`}
                      @click=${(e: any) => (this.selected = e.target.innerText)}
                    >
                      ${i}
                    </button>
                  </div>`
              )}
            </section>
          </div>
        </div>
      `;
    }

    firstUpdated(props: Map<string, any>) {
      super.firstUpdated(props);
      this.keyNavigationListController.initializeKeyList();
    }
  }

  registerElementSafely('demo-key-navigation-list', DemoKeyNavigationList);
  return html`<demo-key-navigation-list></demo-key-navigation-list>`;
}

export function keyNavigationListControllerVertical() {
  class DemoKeyNavigationListVertical extends LitElement {
    static get styles() {
      return [
        baseStyles,
        css`
          section {
            display: flex;
            gap: 4px;
            flex-flow: column;
          }

          [selected] {
            background: var(--cds-alias-status-success);
            color: var(--cds-global-color-white);
          }

          section button {
            width: 50px;
            height: 30px;
            display: block;
          }

          button[tabindex='0']:focus {
            outline: 5px auto Highlight;
            outline: 5px auto -webkit-focus-ring-color;
          }
        `,
      ];
    }

    @state() private items = Array.from(Array(10).keys());
    @state() private selected = '0';
    @state() private active = '';

    @queryAll('section > div') verticalKeyListItems: NodeListOf<HTMLElement>;
    protected keyNavigationListController = new KeyNavigationListController(this, {
      keyListItems: 'verticalKeyListItems',
      layout: 'vertical',
    });

    render() {
      return html`
        <div cds-layout="vertical gap:md">
          <div cds-layout="vertical gap:md">
            <p cds-text="body">Selected: ${this.selected}</p>
            <p cds-text="body">Active: ${this.active}</p>
            <section @cdsKeyChange=${(e: any) => (this.active = e.detail.activeItem.textContent)}>
              ${this.items.map(
                i =>
                  html`<div>
                    <button
                      ?selected=${this.selected === `${i}`}
                      @click=${(e: any) => (this.selected = e.target.innerText)}
                    >
                      ${i}
                    </button>
                  </div>`
              )}
            </section>
          </div>
        </div>
      `;
    }

    firstUpdated(props: Map<string, any>) {
      super.firstUpdated(props);
      this.keyNavigationListController.initializeKeyList();
    }
  }

  registerElementSafely('demo-key-navigation-list-vertical', DemoKeyNavigationListVertical);
  return html`<demo-key-navigation-list-vertical></demo-key-navigation-list-vertical>`;
}

export function keyNavigationListControllerLoop() {
  class DemoKeyNavigationListLoop extends LitElement {
    static get styles() {
      return [
        baseStyles,
        css`
          section {
            display: flex;
            gap: 4px;
            flex-flow: column;
          }

          [selected] {
            background: var(--cds-alias-status-success);
            color: var(--cds-global-color-white);
          }

          section button {
            width: 50px;
            height: 30px;
            display: block;
          }

          button[tabindex='0']:focus {
            outline: 5px auto Highlight;
            outline: 5px auto -webkit-focus-ring-color;
          }
        `,
      ];
    }

    @state() private items = Array.from(Array(5).keys());
    @state() private selected = '0';
    @state() private active = '';

    @queryAll('section > div') verticalKeyListItems: NodeListOf<HTMLElement>;
    protected keyNavigationListController = new KeyNavigationListController(this, {
      keyListItems: 'verticalKeyListItems',
      layout: 'vertical',
      loop: true,
    });

    render() {
      return html`
        <div cds-layout="vertical gap:md">
          <div cds-layout="vertical gap:md">
            <p cds-text="body">Selected: ${this.selected}</p>
            <p cds-text="body">Active: ${this.active}</p>
            <section @cdsKeyChange=${(e: any) => (this.active = e.detail.activeItem.textContent)}>
              ${this.items.map(
                i =>
                  html`<div>
                    <button
                      ?selected=${this.selected === `${i}`}
                      @click=${(e: any) => (this.selected = e.target.innerText)}
                    >
                      ${i}
                    </button>
                  </div>`
              )}
            </section>
          </div>
        </div>
      `;
    }

    firstUpdated(props: Map<string, any>) {
      super.firstUpdated(props);
      this.keyNavigationListController.initializeKeyList();
    }
  }

  registerElementSafely('demo-key-navigation-list-loop', DemoKeyNavigationListLoop);
  return html`<demo-key-navigation-list-loop></demo-key-navigation-list-loop>`;
}

export function keyNavigationGridController() {
  class DemoKeyNavigationGridController extends LitElement {
    protected gridKeyNavigationController = new KeyNavigationGridController(this);

    static get styles() {
      return [
        baseStyles,
        css`
          section {
            display: grid;
            gap: 2px;
            grid-template-columns: repeat(10, 50px);
          }

          [selected] {
            background: var(--cds-alias-status-success);
            color: var(--cds-global-color-white);
          }

          .row {
            display: contents;
          }

          .cell {
            padding: 2px;
          }

          section button {
            width: 100%;
            height: 30px;
            display: block;
          }

          button[tabindex='0']:focus {
            outline: 5px auto Highlight;
            outline: 5px auto -webkit-focus-ring-color;
          }
        `,
      ];
    }

    @query('section') keyGrid: HTMLElement;
    @queryAll('section .row') keyGridRows: NodeListOf<HTMLElement>;
    @queryAll('section .cell') keyGridCells: NodeListOf<HTMLElement>;

    @state() private items = Array.from(Array(10).keys()).map(() => Array.from(Array(10).keys()));
    @state() private selected = '0,0';
    @state() private active = '';

    render() {
      return html`
        <div cds-layout="vertical gap:md">
          <p cds-text="body">Selected: ${this.selected}</p>
          <p cds-text="body">Active: ${this.active}</p>
          <section @cdsKeyChange=${(e: any) => (this.active = e.detail.activeItem.textContent)}>
            ${this.items.map(
              (r, ri) => html`<div class="row">
                ${r.map(
                  c => html` <div class="cell">
                    <button
                      ?selected=${this.selected === `${ri}-${c}`}
                      @click=${(e: any) => (this.selected = e.target.innerText)}
                    >
                      ${ri}-${c}
                    </button>
                  </div>`
                )}
              </div>`
            )}
          </section>
        </div>
      `;
    }
  }

  registerElementSafely('demo-key-navigation-grid', DemoKeyNavigationGridController);
  return html`<demo-key-navigation-grid></demo-key-navigation-grid>`;
}

export function draggableListController() {
  class DemoDraggableListController extends LitElement {
    static get styles() {
      return [
        baseStyles,
        css`
          section {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
          cds-card {
            min-height: 120px;
          }
          [cds-draggable='target'] {
            box-shadow: -4px 0 0 0 var(--cds-alias-status-alt-tint);
          }
          [draggable='false'] {
            width: 100%;
            height: 100%;
            display: block;
          }
        `,
      ];
    }

    @state() private items = Array.from(Array(10).keys()).map(id => ({ id: `${id}` }));

    protected draggableListController = new DraggableListController(this, { shadowRoot: true });

    render() {
      return html`
        <section @cdsDraggableChange=${(e: any) => this.sortList(e)}>
          ${this.items.map(
            item => html`
              <cds-card draggable="true" id=${item.id}>
                <div cds-layout="horizontal">
                  <p cds-text="body">${item.id}</p>
                  <cds-action-handle aria-label="sort item ${item.id}" cds-layout="align:right"></cds-action-handle>
                </div>
              </cds-card>
            `
          )}
          <div draggable="false"></div>
        </section>
      `;
    }

    private sortList(e: any) {
      if (e.detail.type === 'drop') {
        this.items = swapItems(e.detail.target, e.detail.from, this.items);
        e.preventDefault();
      }
    }
  }

  registerElementSafely('demo-draggable-list-controller', DemoDraggableListController);
  return html`<demo-draggable-list-controller></demo-draggable-list-controller>`;
}

export function ariaGridController() {
  class DemoAriaGridController extends LitElement {
    @query('section') grid: HTMLElement;
    @query('section > div:first-child') columnRow: HTMLElement;
    @queryAll('section > div:first-child > div') columns: NodeListOf<HTMLElement>;
    @queryAll('section > div:not(:first-child)') rows: NodeListOf<HTMLElement & { cells: NodeListOf<HTMLElement> }>;

    private ariaGridController = new AriaGridController(this);

    static styles = [
      css`
        [role='grid'] {
          width: 500px;
          border: 1px solid #ccc;
        }

        [role='row'] {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        [role='grid'] [aria-rowindex]:nth-child(odd) {
          filter: brightness(97%);
        }

        [role='grid'] [aria-rowindex]:hover {
          filter: brightness(94%);
        }

        [aria-colcount='5'] [role='row'] {
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }

        [role='gridcell'],
        [role='rowheader'],
        [role='columnheader'] {
          padding: 12px 18px;
        }

        [role='columnheader']:last-child,
        [role='gridcell']:last-child,
        [role='row']:last-child {
          border-right: none;
        }

        [role='columnheader'] {
          border-bottom: 1px solid #ccc;
        }

        [role='grid'] {
          background: #eee;
          overflow: hidden;
        }

        [role='gridcell'] {
          background: #fff;
        }

        [aria-rowspan],
        [role='rowheader'],
        [role='columnheader'] {
          background: none;
          font-weight: 500;
        }
      `,
    ];

    render() {
      return html`
        <section>
          <div>
            <div>Host</div>
            <div>Status</div>
            <div>CPU</div>
            <div>Memory</div>
          </div>
          <div>
            <div>vm-host-001</div>
            <div>online</div>
            <div>5%</div>
            <div>10%</div>
          </div>
          <div>
            <div>vm-host-003</div>
            <div>online</div>
            <div>10%</div>
            <div>30%</div>
          </div>
          <div>
            <div>vm-host-002</div>
            <div>online</div>
            <div>20%</div>
            <div>35%</div>
          </div>
          <div>
            <div>vm-host-011</div>
            <div>offline</div>
            <div>90%</div>
            <div>80%</div>
          </div>
        </section>
      `;
    }

    async connectedCallback() {
      super.connectedCallback();
      await this.updateComplete;
      this.rows.forEach(r => (r.cells = r.querySelectorAll('div')));
      this.ariaGridController.update();
    }
  }

  registerElementSafely('grid-a11y-test-element', DemoAriaGridController);
  return html`<grid-a11y-test-element></grid-a11y-test-element>`;
}

export function ariaPopupController() {
  const styles = css`
    :host {
      display: inline-block;
      padding: 12px;
      width: 100px;
      border: 2px solid #ccc;
    }
    :host([hidden]) {
      display: none !important;
    }
  `;
  class DemoAriaPopup extends LitElement {
    ariaPopupController = new AriaPopupController(this);
    static styles = [styles];

    get trigger() {
      return (this.getRootNode() as HTMLElement).querySelector<HTMLElement>(`#${this.getAttribute('anchor')}`);
    }

    render() {
      return html`<slot></slot>`;
    }
  }

  class DemoAriaPopupTrigger extends LitElement {
    ariaPopupTriggerController = new AriaPopupTriggerController(this);
    static styles = [styles];

    render() {
      return html`<slot></slot>`;
    }
  }

  class DemoPopupController extends LitElement {
    @state() show = false;

    render() {
      return html`
        <demo-trigger popup="my-popup" id="my-trigger" role="button" tabindex="0" @click=${() => (this.show = true)}
          >trigger</demo-trigger
        ><br />
        <demo-popup ?hidden=${!this.show} anchor="my-trigger" id="my-popup" @click=${() => (this.show = false)}
          >popup</demo-popup
        >
      `;
    }
  }

  registerElementSafely('demo-popup-controller', DemoPopupController);
  registerElementSafely('demo-popup', DemoAriaPopup);
  registerElementSafely('demo-trigger', DemoAriaPopupTrigger);
  return html`<demo-popup-controller></demo-popup-controller>`;
}
