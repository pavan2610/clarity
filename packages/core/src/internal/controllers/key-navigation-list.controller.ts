import { ReactiveControllerHost } from 'lit';
import { getTabableItems } from '../utils/keycodes.js';

export interface KeyNavigationListConfig {
  shadowRoot?: boolean;
  keyListItems?: string;
  layout?: 'both' | 'horizontal' | 'vertical';
  manageFocus?: boolean;
  manageTabindex?: boolean;
  loop?: boolean;
}

export class KeyNavigationListController {
  private get listItems() {
    return (this.host as any)[this.config.keyListItems] as NodeListOf<HTMLElement>;
  }

  private get hostRoot() {
    return this.config.shadowRoot ? this.host.shadowRoot : this.host;
  }

  constructor(private host: ReactiveControllerHost & HTMLElement, private config?: KeyNavigationListConfig) {
    this.config = {
      shadowRoot: true,
      keyListItems: 'keyListItems',
      layout: 'horizontal',
      manageFocus: true,
      manageTabindex: true,
      loop: false,
      ...config,
    };
    host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;

    this.hostRoot.addEventListener('click', (e: any) => {
      const activeCell = Array.from(this.listItems).find(
        c => c === e.target.closest(this.listItems[0].tagName.toLocaleLowerCase()) ?? c === e.target
      );
      if (activeCell) {
        this.setActiveCell(e, activeCell);
      }
    });

    this.hostRoot.addEventListener('keydown', (e: any) => {
      if (this.validKeyCode(e)) {
        const currentItem = Array.from(this.listItems).find(
          c => c === e.target.closest(this.listItems[0].tagName.toLocaleLowerCase()) ?? c === e.target
        );
        if (currentItem) {
          const { index, previous } = this.getNextItemCoordinate(e.code, currentItem);
          const activeItem = this.listItems[index] as HTMLElement;
          const previousItem = this.listItems[previous] as HTMLElement;
          this.setActiveCell(e, activeItem, previousItem);
        }
      }
    });
  }

  initializeKeyList() {
    if (this.config.manageFocus && this.config.manageTabindex) {
      Array.from(this.listItems).forEach((i: HTMLElement) => i.setAttribute('tabindex', '-1'));
      const firstCell = this.listItems[0];
      firstCell?.setAttribute('tabindex', '0');
    }
  }

  private validKeyCode(e: KeyboardEvent) {
    return (
      e.code === 'ArrowUp' ||
      e.code === 'ArrowDown' ||
      e.code === 'ArrowLeft' ||
      e.code === 'ArrowRight' ||
      e.code === 'End' ||
      e.code === 'Home' ||
      e.code === 'PageUp' ||
      e.code === 'PageDown'
    );
  }

  private setActiveCell(e: any, activeItem: HTMLElement, prev?: HTMLElement) {
    const previousItem = prev ?? Array.from(this.listItems).find(c => c.getAttribute('tabindex') === '0');
    if (this.config.manageFocus) {
      if (previousItem && this.config.manageTabindex) {
        previousItem.setAttribute('tabindex', '-1');
      }

      if (this.config.manageTabindex) {
        activeItem.setAttribute('tabindex', '0');
      }

      const items = getTabableItems(activeItem);
      const item = items[0] ?? activeItem;
      item.focus();
      e.preventDefault();
    }

    activeItem.dispatchEvent(
      new CustomEvent('cdsKeyChange', {
        bubbles: true,
        detail: {
          activeItem,
          previousItem,
          code: e.code,
          metaKey: e.ctrlKey || e.metaKey,
          keyListItems: this.config.keyListItems,
        },
      })
    );
  }

  private getNextItemCoordinate(code: string, currentItem: HTMLElement) {
    let i = Array.from(this.listItems).indexOf(currentItem);
    const previous = i;
    const dir = this.host.dir;
    const inlineStart = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    const inlineEnd = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const numOfItems = Array.from(this.listItems).length - 1;

    if (this.config.layout !== 'horizontal' && code === 'ArrowUp' && i !== 0) {
      i = i - 1;
    } else if (this.config.layout !== 'horizontal' && code === 'ArrowUp' && i === 0 && this.config.loop) {
      i = numOfItems;
    } else if (this.config.layout !== 'horizontal' && code === 'ArrowDown' && i < numOfItems) {
      i = i + 1;
    } else if (this.config.layout !== 'horizontal' && code === 'ArrowDown' && i === numOfItems && this.config.loop) {
      i = 0;
    } else if (this.config.layout !== 'vertical' && code === inlineStart && i !== 0) {
      i = i - 1;
    } else if (this.config.layout !== 'vertical' && code === inlineEnd && i < numOfItems) {
      i = i + 1;
    } else if (code === 'End') {
      i = numOfItems;
    } else if (code === 'Home') {
      i = 0;
    } else if (code === 'PageUp') {
      i = i - 4 > 0 ? i - 4 : 0;
    } else if (code === 'PageDown') {
      i = i + 4 < numOfItems ? i + 4 : numOfItems;
    }

    return { index: i, previous };
  }
}
