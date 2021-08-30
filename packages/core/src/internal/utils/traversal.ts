/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

export function getFlattenedFocusableItems(element: Node, depth = 10) {
  const focusableSelector = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([readonly])',
    'button:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'iframe',
    'object',
    'embed',
    '*[tabindex]',
    '*[contenteditable=true]',
    '[role=button]:not([disabled])',
    'button',
  ].join(',');
  return getFlattenedDOMTree(element, depth).filter((e: HTMLElement) => e.matches(focusableSelector)) as HTMLElement[];
}

export function getFlattenedDOMTree(node: any, depth = 10): any {
  return Array.from(getChildren(node)).reduce((prev: any[], next: any) => {
    return [...prev, [next, [...Array.from(getChildren(next)).map((i: any) => ([i, getFlattenedDOMTree(i, depth)]))]]];
  }, []).flat(depth);
}

export function getChildren(node: any) {
  if (node.documentElement) {
    return node.documentElement.children;
  } else if (node.shadowRoot) {
    return node.shadowRoot.children;
  } else if (node.assignedElements) {
    const slotted = node.assignedElements(); // slotted elements
    return slotted.length ? slotted : node.children // else fallback
  } else {
    return node.children;
  }
}
