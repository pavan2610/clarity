import { ReactiveControllerHost } from 'lit';
import { createFragment } from '../utils/dom.js';
import { getFlattenedFocusableItems } from '../utils/traversal.js';

/**
 * Focus Trap that given a DOM element creates a flattened tree traversal
 * between both Shadow DOM and Light DOM
 */
export class InlineFocusTrapController {
  constructor(private host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this);
  }

  private get focusableItems() {
    return getFlattenedFocusableItems(this.root)
      .filter(e => !e.hasAttribute('cds-focus-boundary') && ((this.root.contains(e) || e.closest('[cds-focus-trap]') === this.host)))
  }

  private get root() {
    return (this.host.shadowRoot ? this.host.shadowRoot : this.host) as HTMLElement;
  }

  async hostConnected() {
    await this.host.updateComplete;
    const trap = '<div cds-focus-boundary tabindex="0" style="display:none;position:absolute"></div>';
    this.root.appendChild(createFragment('<style>:host(:host:focus-within) [cds-focus-boundary] {display: block !important}</style>'));
    this.root.prepend(createFragment(trap));
    this.root.appendChild(createFragment(trap));
    this.host.setAttribute('cds-focus-trap', '');

    const [start, end] = Array.from(this.root.querySelectorAll('[cds-focus-boundary]'));
    start.addEventListener('focusin', () => this.focusableItems.at(-1).focus());
    end.addEventListener('focusin', () => this.focusableItems.at(0).focus());
  }
}
