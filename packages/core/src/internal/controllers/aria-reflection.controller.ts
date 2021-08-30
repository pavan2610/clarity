import { ReactiveControllerHost } from 'lit';
import { browserFeatures } from '../utils/supports.js';

/**
 * Shim for aria atribute reflection primarily for Firefox support
 * Currently only patching our Custom Elements. Global polyfill can be used at the app level if needed.
 * https://wicg.github.io/aom/aria-reflection-explainer.html
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaLabel
 */
export class AriaReflectionController {
  private static initialized = false;

  constructor(private host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this as any);

    if (!browserFeatures.supports.roleReflect && !AriaReflectionController.initialized) {
      reflect(Element.prototype, 'role', 'role');
    }

    // https://www.w3.org/TR/wai-aria-1.0/states_and_properties
    if (!browserFeatures.supports.ariaReflect && !AriaReflectionController.initialized) {
      [
        'ActiveDescendant',
        'Atomic',
        'AutoComplete',
        'Busy',
        'Checked',
        'ColCount',
        'ColIndex',
        'ColSpan',
        'Controls',
        'Current',
        'DescribedBy',
        'Details',
        'Disabled',
        'ErrorMessage',
        'Expanded',
        'FlowTo',
        'HasPopup',
        'Hidden',
        'Invalid',
        'KeyShortcuts',
        'Label',
        'LabelledBy',
        'Level',
        'Live',
        'Modal',
        'MultiLine',
        'MultiSelectable',
        'Orientation',
        'Owns',
        'Placeholder',
        'PosInSet',
        'Pressed',
        'ReadOnly',
        'Relevant',
        'Required',
        'RoleDescription',
        'RowCount',
        'RowIndex',
        'RowSpan',
        'Selected',
        'SetSize',
        'Sort',
        'ValueMax',
        'ValueMin',
        'ValueNow',
        'ValueText',
      ].forEach(name => reflect(Element.prototype, `aria-${name.toLowerCase()}`, `aria${name}`));

      AriaReflectionController.initialized = true;
    }
  }
}

function reflect(element: HTMLElement | Element, attributeName: string, propertyName: string) {
  Object.defineProperty(element, propertyName, {
    configurable: true,
    enumerable: true,
    get: function () {
      return this.hasAttribute(attributeName) ? this.getAttribute(attributeName) : null;
    },
    set: function (value) {
      if (value !== null) {
        this.setAttribute(attributeName, value);
      } else {
        this.removeAttribute(attributeName);
      }
    },
  });
}

declare global {
  // patching missing types as needed
  interface HTMLElement {
    role: string;
    ariaActiveDescendant: string | null;
    ariaColCount: string | null;
    ariaColIndex: string | null;
    ariaColSpan: string | null;
    ariaCurrent: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | null;
    ariaDisabled: 'true' | 'false' | null;
    ariaExpanded: 'true' | 'false' | null;
    ariaHidden: 'true' | 'false' | null;
    ariaLabel: string | null;
    ariaLabelledBy: string | null;
    ariaRowCount: string | null;
    ariaRowIndex: string | null;
    ariaRowSpan: string | null;
    ariaSelected: 'true' | 'false' | null;
    ariaSort: 'ascending' | 'descending' | 'none' | null;
    ariaModal: 'true' | 'false' | null;
    ariaMultiSelectable: 'true' | 'false' | null;
  }
}
