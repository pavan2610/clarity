import { ReactiveControllerHost } from 'lit';
import { createId } from '../utils/identity.js';
import { KeyNavigationListController } from './key-navigation-list.controller.js';

let dragSrcEl: HTMLElement | null = null;

export type DraggableItem = HTMLElement & { cdsDraggableItem?: 'item' | 'dropzone' };

export interface DraggableListControllerConfig {
  shadowRoot?: boolean;
  layout?: 'both' | 'horizontal' | 'vertical';
  item?: string;
  dropZone?: string;
  manageFocus?: boolean;
}

export class DraggableListController {
  private get items() {
    return Array.from(this.hostRoot.querySelectorAll<DraggableItem>(`${this.config.item}[draggable=true]`));
  }

  private get dropZones() {
    return Array.from(this.hostRoot.querySelectorAll<DraggableItem>(`${this.config.dropZone}[draggable=false]`));
  }

  private get hostRoot() {
    return this.config.shadowRoot ? this.host.shadowRoot : this.host;
  }

  private observer: MutationObserver;

  private config: DraggableListControllerConfig;

  private id = `__${createId()}`;

  constructor(private host: ReactiveControllerHost & HTMLElement, config: DraggableListControllerConfig) {
    this.config = { shadowRoot: false, layout: 'both', item: '', dropZone: '', manageFocus: true, ...config };
    host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.addDragEventListeners();
    this.addKeyboardEventListeners();
    this.initializeKeyListController();

    this.observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          this.addDragEventListeners();
        }
      }
    });

    this.observer.observe(this.host, { childList: true });
  }

  hostDisconnected() {
    this.observer?.disconnect();
  }

  private initializeKeyListController() {
    Object.defineProperty(this.host, this.id, { get: () => this.items.map(i => i.querySelector('[cds-draggable]')) });
    new KeyNavigationListController(this.host, {
      layout: this.config.layout,
      keyListItems: this.id,
      manageFocus: this.config.manageFocus,
    });
  }

  private addKeyboardEventListeners() {
    this.hostRoot.addEventListener('cdsKeyChange', (e: any) => {
      if (e.detail.keyListItems === this.id && e.detail.metaKey) {
        const from = e.detail.previousItem?.closest('[draggable]');
        const target = e.detail.activeItem.closest('[draggable]');
        e.detail.activeItem.dispatchEvent(
          new CustomEvent('cdsDraggableChange', { detail: { from, target, type: 'drop' }, bubbles: true })
        );
      }
    });
  }

  private addDragEventListeners() {
    this.items.filter(i => !i.cdsDraggableItem).forEach(item => addHandlers(item));
    this.dropZones
      .filter(i => !i.cdsDraggableItem)
      .forEach(elem => {
        elem.addEventListener('dragover', handleDragOver, false);
        elem.addEventListener('dragleave', handleDragLeave, false);
        elem.addEventListener('drop', handleDrop, false);
        elem.cdsDraggableItem = 'dropzone';
      });
  }
}

function handleDragStart(e: any) {
  dragSrcEl = e.currentTarget;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
  e.currentTarget.setAttribute('cds-draggable', 'active');
  e.currentTarget.dispatchEvent(
    new CustomEvent('cdsDraggableChange', {
      detail: { from: e.currentTarget, target: null, type: 'dragstart' },
      bubbles: true,
    })
  );
}

function handleDragOver(e: any) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = 'move';

  if (dragSrcEl !== e.currentTarget) {
    e.currentTarget.setAttribute('cds-draggable', 'target');
  }

  return false;
}

function handleDrop(e: any) {
  const items: DraggableItem[] = Array.from(e.currentTarget.parentElement.querySelectorAll('[draggable]'));
  const from = dragSrcEl;
  const target = items.find(i => i === e.currentTarget);
  from.removeAttribute('cds-draggable');
  target.removeAttribute('cds-draggable');

  e.currentTarget.dispatchEvent(
    new CustomEvent('cdsDraggableChange', { detail: { from, target, type: 'drop' }, bubbles: true })
  );
  return false;
}

function handleDragLeave(e: any) {
  if (e.currentTarget.getAttribute('cds-draggable') === 'target') {
    e.currentTarget.removeAttribute('cds-draggable');
  }
}

function addHandlers(elem: any) {
  elem.cdsDraggableItem = 'item';
  elem.addEventListener('dragstart', handleDragStart, false);
  elem.addEventListener('dragover', handleDragOver, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener('dragend', (e: any) => e.currentTarget.removeAttribute('cds-draggable'), false);
}
