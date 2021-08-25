import { Component } from '@angular/core';
import { VmService } from '../vm.service';
import { TestVM } from '@cds/core/demo';

@Component({
  selector: 'app-pin-columns',
  templateUrl: './pin-columns.component.html',
  styleUrls: ['./pin-columns.component.scss'],
})
export class PinColumnsComponent {
  pinFirst = true;
  pinLast = true;
  data: TestVM[] = [];
  dataFields!: string[];
  constructor(private vmData: VmService) {
    this.data = vmData.get();
    this.dataFields = vmData.fields;
  }
}
