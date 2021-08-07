import { Component, OnInit } from '@angular/core';
import { sortStrings, TestVM } from '@cds/core/demo';
import { VmService } from '../vm.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
})
export class SortingComponent implements OnInit {
  data: TestVM[];
  sortedData: TestVM[] = [];
  sortType: 'none' | 'ascending' | 'descending' = 'none';

  constructor(private vmData: VmService) {
    this.data = vmData.get();
  }

  ngOnInit() {
    this.sortedData = sortStrings([...this.data], 'id', this.sortType);
  }

  sortGrid(event: Event) {
    const sortEvent = event as CustomEvent;
    // ${(e: any) => (this.sortType = e.detail)}
    this.sortType = sortEvent.detail;
    console.log(event);
    this.sortedData = sortStrings([...this.data], 'id', this.sortType);
  }
}

// enum ColumnTypes {
//   Host = 1,
//   Status = 2,
//   CPU = 4,
//   Memory = 8,
//   All = ColumnTypes.Host | ColumnTypes.Status | ColumnTypes.CPU | ColumnTypes.Memory,
// }
//
// class DemoColumnVisibility extends LitElement {
//   @state() private data = getVMData();
//   @state() private selectedColumns = ColumnTypes.All;
//   @state() private columnAnchor: HTMLElement;
//
//   render() {
//     return html`
//         <cds-grid aria-label="column visibility datagrid demo" style="--body-height: 360px">
//           <cds-grid-column>Host</cds-grid-column>
//           ${this.checked(ColumnTypes.Status) ? html`<cds-grid-column>Status</cds-grid-column>` : ''}
//           ${this.checked(ColumnTypes.CPU) ? html`<cds-grid-column>CPU</cds-grid-column>` : ''}
//           ${this.checked(ColumnTypes.Memory) ? html`<cds-grid-column>Memory</cds-grid-column>` : ''}
//           ${this.data.map(entry => html`
//           <cds-grid-row>
//             <cds-grid-cell>${entry.id}</cds-grid-cell>
//             ${this.checked(ColumnTypes.Status) ? html`<cds-grid-cell>${entry.status}</cds-grid-cell>` : ''}
//             ${this.checked(ColumnTypes.CPU) ? html`<cds-grid-cell>${entry.cpu}%</cds-grid-cell>` : ''}
//             ${this.checked(ColumnTypes.Memory) ? html`<cds-grid-cell>${entry.memory}%</cds-grid-cell>` : ''}
//           </cds-grid-row>`)}
//           <cds-grid-footer>
//             <cds-action @click=${(e: any) => (this.columnAnchor = e.target)} aria-label="filter column" shape="view-columns" .status=${!this.checked(ColumnTypes.All) ? 'active' : ''}></cds-action>
//           </cds-grid-footer>
//         </cds-grid>
//         ${this.columnAnchor ? html`
//         <cds-dropdown @closeChange=${(): void => this.columnAnchor = null} .anchor=${this.columnAnchor} position="top">
//           <cds-checkbox-group layout="vertical">
//             <cds-checkbox>
//               <label>Status</label>
//               <input type="checkbox" value=${ColumnTypes.Status} @click=${this.selectColumns} .checked=${this.checked(ColumnTypes.Status)} />
//             </cds-checkbox>
//             <cds-checkbox>
//               <label>CPU</label>
//               <input type="checkbox" value=${ColumnTypes.CPU} @click=${this.selectColumns} .checked=${this.checked(ColumnTypes.CPU)} />
//             </cds-checkbox>
//             <cds-checkbox>
//               <label>Memory</label>
//               <input type="checkbox" value=${ColumnTypes.Memory} @click=${this.selectColumns} .checked=${this.checked(ColumnTypes.Memory)} />
//             </cds-checkbox>
//           </cds-checkbox-group>
//           <cds-button action="flat" @click=${this.selectAll} ?disabled=${this.checked(ColumnTypes.All)}>
//             Select All
//           </cds-button>
//         </cds-dropdown>` : ''}`;
//   }
//
//   private selectColumns() {
//     this.selectedColumns = Array.from(this.shadowRoot.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'))
//       .filter(c => c.checked)
//       .map(c => parseInt(c.value))
//       .reduce((p, n) => p + n, 1);
//   }
//
//   private selectAll() {
//     this.selectedColumns = ColumnTypes.All;
//   }
//
//   private checked(value: ColumnTypes) {
//     return value === (this.selectedColumns & value);
//   }
// }
