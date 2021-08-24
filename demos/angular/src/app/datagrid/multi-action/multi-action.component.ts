import { Component } from '@angular/core';
import { ColumnTypes, TestVM } from '@cds/core/demo';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { VmService } from '../vm.service';

@Component({
  selector: 'app-multi-action',
  templateUrl: './multi-action.component.html',
  styleUrls: ['./multi-action.component.scss'],
})
export class MultiActionComponent {
  ColumnTypes = ColumnTypes;
  batchActionAnchor: EventTarget | null = null;
  clrNgSelected: TestVM[] = [];
  cdsSelected: Set<string> = new Set();
  get cdsSelectedVMs(): string[] {
    return Array.from(this.cdsSelected);
  }
  // Form group for the generated form controls
  // A list of test VM's to display in a grid
  data: TestVM[] = [];
  // Extracted 'fields' from a row of data -> These will become columns
  dataFields!: string[];

  multiActionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private vmData: VmService) {
    this.data = vmData.get();
    this.dataFields = Object.keys(this.data[0]);
    this.multiActionForm = this.formBuilder.group({
      allRows: [false],
      currentPage: [1],
      pageSize: [10],
      rows: new FormGroup({}),
    });
    this.data.forEach(vm =>
      (this.multiActionForm.controls.rows as FormGroup).addControl(vm.id, new FormControl(false))
    );
    this.multiActionForm.controls.allRows.valueChanges.subscribe(value =>
      this.data.forEach(i => this.multiActionForm.controls.rows.get(i.id)?.setValue(value))
    );
  }

  get selectedCount() {
    return this.data.map(i => this.multiActionForm.controls.rows.get(i.id)?.value).filter((i: any) => i).length;
  }

  get selectedCdsVMs() {
    return this.data
      .map(vm => {
        if (this.multiActionForm.controls.rows.get(vm.id)?.value) {
          return vm;
        } else {
          return;
        }
      })
      .filter(vm => vm !== undefined);
  }

  batchAction(action: string) {
    alert(`${action}: ${this.selectedCdsVMs.map(vm => vm?.id)}`);
    this.batchActionAnchor = null;
  }

  clrAction(action: string) {
    alert(`${action}: ${this.clrNgSelected.map(vm => vm?.id)}`);
  }

  showBatchActions(event: Event) {
    this.batchActionAnchor = event.target;
  }
}
