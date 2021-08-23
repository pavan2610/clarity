import { html, LitElement } from 'lit';
import { query } from 'lit/decorators/query.js';
import { queryAll } from 'lit/decorators/query-all.js';
import { customElement } from '@cds/core/internal';
import { componentIsStable, createTestElement, removeTestElement } from '@cds/core/test';
import { GridRangeSelectionController } from './grid-range-selection.controller.js';

@customElement('grid-range-select-controller-test-element')
class GridRangeSelectionControllerTestElement extends LitElement {
  @query('section') grid: HTMLElement;
  @queryAll('section button') cells: NodeListOf<HTMLElement>;
  @queryAll('section div') rows: NodeListOf<HTMLElement>;
  rangeSelection = true;

  protected gridRangeSelectionController = new GridRangeSelectionController(this);

  render() {
    return html`...`;
  }
}

describe('grid-range-select.controller', () => {
  let component: HTMLElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(
      html`<grid-range-select-controller-test-element></grid-range-select-controller-test-element>`
    );
    component = element.querySelector<GridRangeSelectionControllerTestElement>(
      'grid-range-select-controller-test-element'
    );
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should', async () => {
    await componentIsStable(component);
    expect(component).toBeTruthy();
  });
});
