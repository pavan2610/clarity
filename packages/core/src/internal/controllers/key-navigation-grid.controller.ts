import { ReactiveControllerHost } from 'lit';
import { onChildListMutation, onFirstInteraction } from '@cds/core/internal';
import { getTabableItems } from '../utils/keycodes.js';

export interface KeyNavigationGridConfig {
  keyGrid?: string;
  keyGridRows?: string;
  keyGridCells?: string;
}

export class KeyNavigationGridController {
  private observers: MutationObserver[] = [];

  private get grid() {
    return (this.host as any)[this.config.keyGrid] as HTMLElement;
  }

  private get rows() {
    return (this.host as any)[this.config.keyGridRows] as NodeListOf<HTMLElement>;
  }

  private get cells() {
    return (this.host as any)[this.config.keyGridCells] as NodeListOf<HTMLElement>;
  }

  constructor(private host: ReactiveControllerHost & HTMLElement, private config?: KeyNavigationGridConfig) {
    this.config = { keyGridRows: 'keyGridRows', keyGridCells: 'keyGridCells', keyGrid: 'keyGrid', ...config };
    host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;

    onFirstInteraction(this.host).then(() => {
      this.initializeTabIndex();
      this.grid.addEventListener('mousedown', (e: MouseEvent) => this.activateCell(e));
      this.grid.addEventListener('keydown', (e: KeyboardEvent) => this.focusCell(e));
    });

    this.observers.push(onChildListMutation(this.host, () => this.initializeTabIndex()));
  }

  hostDisconnected() {
    this.observers.forEach(o => o.disconnect());
  }

  private initializeTabIndex() {
    this.cells.forEach((i: HTMLElement) => i.setAttribute('tabindex', '-1'));
    this.cells[0]?.setAttribute('tabindex', '0');
  }

  private activateCell(e: any) {
    // preserve right click for context menus & keyboard mouse control https://apple.stackexchange.com/questions/32715/how-do-i-open-the-context-menu-from-a-mac-keyboard
    if (e.buttons === 1 && !e.ctrlKey) {
      const tagName = this.cells[0].tagName.toLocaleLowerCase();
      const activeCell = Array.from(this.cells).find(c => c === e.target.closest(tagName) ?? c === e.target);
      if (activeCell) {
        this.setActiveCell(e, activeCell);
      }
    }
  }

  private elementInputType(_el: HTMLElement) {
    // return /^(?:input|select|textarea)$/i.test(el.nodeName);
    return false;
  }

  private focusCell(e: KeyboardEvent) {
    if (this.validKeyCode(e) && !this.elementInputType(e.target as HTMLElement)) {
      const { x, y } = this.getNextItemCoordinate(e);
      const activeItem = this.rows[y].children[x] as HTMLElement;
      this.setActiveCell(e, activeItem);
      e.preventDefault();
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

  private setActiveCell(e: any, activeCell: HTMLElement) {
    const prior = Array.from(this.cells).find(c => c.getAttribute('tabindex') === '0');

    if (prior) {
      prior.setAttribute('tabindex', '-1');
    }

    activeCell.setAttribute('tabindex', '0');

    const items = getTabableItems(activeCell);
    const item = items[0] ?? activeCell;
    item.focus();

    item.dispatchEvent(
      new CustomEvent('cdsKeyChange', {
        bubbles: true,
        detail: { code: e.code, shiftKey: e.shiftKey, activeItem: activeCell },
      })
    );
  }

  private getNextItemCoordinate(e: any) {
    const currentCell = Array.from(this.cells).find(i => i.getAttribute('tabindex') === '0');
    const currentRow = Array.from(this.rows).find(r => r.contains(currentCell));
    const numOfRows = this.rows.length - 1;
    const numOfColumns = currentRow.children.length - 1;

    let x = Array.from(currentRow.children).indexOf(currentCell);
    let y = Array.from(this.rows).indexOf(currentRow);

    const dir = this.host.dir;
    const inlineStart = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    const inlineEnd = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';

    if (e.code === 'ArrowUp' && y !== 0) {
      y = y - 1;
    } else if (e.code === 'ArrowDown' && y < numOfRows) {
      y = y + 1;
    } else if (e.code === inlineStart && x !== 0) {
      x = x - 1;
    } else if (e.code === inlineEnd && x < numOfColumns) {
      x = x + 1;
    } else if (e.code === 'End') {
      x = numOfColumns;

      if (e.ctrlKey) {
        y = numOfRows;
      }
    } else if (e.code === 'Home') {
      x = 0;

      if (e.ctrlKey) {
        y = 0;
      }
    } else if (e.code === 'PageUp') {
      y = y - 4 > 0 ? y - 4 : 0;
    } else if (e.code === 'PageDown') {
      y = y + 4 < numOfRows ? y + 4 : numOfRows;
    }

    return { x, y };
  }
}
