import { Component, OnInit } from '@angular/core';
import { VmService } from '../vm.service';
import { TestVM } from '@cds/core/demo';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent {
  data: TestVM[];
  dataFields!: string[];

  constructor(private vmData: VmService) {
    this.data = vmData.get();
    this.dataFields = vmData.fields;
  }
}
