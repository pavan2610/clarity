/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

// we export any non component code such as utilities at the root '@clr/core'
export { I18nService, componentStringsDefault } from '@cds/core/internal';

// type global attribute utilities
declare global {
  interface HTMLElement {
    'cds-text': string;
    'cds-layout': string;
    'cds-list': string;
    'cds-table': string;
  }

  interface HTMLElementTagNameMap {
    'cds-demo': HTMLElement;
    'cds-placeholder': HTMLElement;
  }
}

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Union<T, K> = T & K;
type CustomElementMap<T> = { [K in keyof T]: CustomEvent<T[K]> };
declare module 'lit-element/lit-element.js' {
  interface LitElement<J = any> {
    addEventListener<K extends KeysOfUnion<CustomElementMap<J> & HTMLElementEventMap>>(
      type: K,
      listener: (this: HTMLElement, ev: Union<CustomElementMap<J>, HTMLElementEventMap>[K]) => any,
      options?: boolean | AddEventListenerOptions
    ): void;
    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ): void;
  }
}

// const col = { } as CdsGridColumn;
// col.addEventListener('resizeChange', (e) => console.log(e.detail));
// col.addEventListener('click', (e) => console.log(e));

// const el = document.createElement('div');
// el.addEventListener('keyup', e => console.log(e));
// el.addEventListener('click', e => console.log(e));
