import { Component, OnInit } from '@angular/core';
import { VmService } from '../vm.service';
import { TestVM } from '@cds/core/demo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent {
  data: Observable<TestVM[]>;

  constructor(private vmData: VmService) {
    this.data = vmData.asyncGet();
  }
}
