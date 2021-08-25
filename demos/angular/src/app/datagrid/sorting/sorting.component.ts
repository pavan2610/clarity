import { Component, OnInit } from '@angular/core';
import { sortStrings, TestVM } from '@cds/core/demo';
import { VmService } from '../vm.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
})
export class SortingComponent implements OnInit {
  // A list of test VM's to display in a grid
  data: TestVM[] = [];
  // Extracted 'fields' from a row of data -> These will become columns
  dataFields!: string[];
  sortedData: TestVM[] = [];
  sortType: 'none' | 'ascending' | 'descending' = 'none';

  constructor(private vmData: VmService) {
    this.data = vmData.get();
    this.dataFields = vmData.fields;
  }

  ngOnInit() {
    this.sortedData = sortStrings([...this.data], 'id', this.sortType);
  }

  sortGrid(event: Event) {
    const sortEvent = event as CustomEvent;
    this.sortType = sortEvent.detail;
    this.sortedData = sortStrings([...this.data], 'id', this.sortType);
  }
}
