import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TestVM } from '@cds/core/demo';
import { VmService } from '../vm.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  data: Observable<TestVM[]>;
  currentVM!: TestVM | null;
  anchor: HTMLElement | null = null;

  constructor(private vmData: VmService) {
    this.data = vmData.asyncGet(500);
  }

  getDetails(id: string): string {
    return `view host ${id} details`;
  }

  showDetail(event: any, vm: TestVM) {
    if (this.currentVM?.id !== vm.id) {
      this.currentVM = vm;
      this.anchor = event.target;
    } else {
      this.currentVM = null;
    }
  }
}
