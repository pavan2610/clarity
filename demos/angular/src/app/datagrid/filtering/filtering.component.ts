import { Component, OnInit } from '@angular/core';
import { filter, TestVM } from '@cds/core/demo';
import { VmService } from '../vm.service';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.scss'],
})
export class FilteringComponent implements OnInit {
  data: TestVM[];
  dataFields!: string[];
  anchor: EventTarget | null = null;
  search: string = '';
  hiddenFilter = true;
  filteredList: TestVM[] = [];

  constructor(private vmData: VmService) {
    this.data = vmData.get();
    this.dataFields = vmData.fields;
  }

  ngOnInit() {
    this.filteredList = filter([...this.data], 'id', this.search);
  }

  toggleFilter(event: Event) {
    this.anchor = event.target;
    this.hiddenFilter = !this.hiddenFilter;
  }

  filterByID(event: Event) {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    this.search = input.value ? input.value : '';
    this.filteredList = filter([...this.data], 'id', this.search);
  }
}
