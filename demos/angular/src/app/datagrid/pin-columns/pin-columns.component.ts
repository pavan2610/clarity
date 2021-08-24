import { Component } from '@angular/core';
import { VmService } from '../vm.service';
import { TestVM } from '@cds/core/demo';

@Component({
  selector: 'app-pin-columns',
  templateUrl: './pin-columns.component.html',
  styleUrls: ['./pin-columns.component.scss'],
})
export class PinColumnsComponent {
  // A list of test VM's to display in a grid
  pinFirst = true;
  pinLast = true;
  data: TestVM[] = [];
  // Extracted 'fields' from a row of data -> These will become columns
  dataFields!: string[];
  constructor(private vmData: VmService) {
    this.data = vmData.get();
    this.dataFields = Object.keys(this.data[0]);
  }
}
