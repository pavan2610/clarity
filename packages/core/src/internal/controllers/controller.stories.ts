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
  KeyNavigationGridController,
  KeyNavigationListController,
  registerElementSafely,
  state,
} from '@cds/core/internal';
import '@cds/core/badge/register.js';

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

    firstUpdated(props: Map<string, any>) {
      super.firstUpdated(props);
      this.gridKeyNavigationController.initializeKeyGrid();
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
      this.items = sortList(e.detail.target, e.detail.from, this.items);
      e.preventDefault();
    }
  }

  registerElementSafely('demo-draggable-list-controller', DemoDraggableListController);
  return html`<demo-draggable-list-controller></demo-draggable-list-controller>`;
}

export function sortList<T>(target: T & { id: any }, src: T & { id: any }, list: { id: any }[]) {
  const data = [...list];
  const srcIndex = data.findIndex(i => i.id === src.id);
  const targetIndex = data.findIndex(i => i.id === target.id);
  const srcItem = data.splice(srcIndex, 1)[0];
  targetIndex === -1 ? data.push(srcItem) : data.splice(targetIndex, 0, srcItem);
  return data;
}
