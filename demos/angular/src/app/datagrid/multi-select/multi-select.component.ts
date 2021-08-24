import { Component } from '@angular/core';
import { ColumnTypes, TestVM } from '@cds/core/demo';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { VmService } from '../vm.service';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent {
  ColumnTypes = ColumnTypes;

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

  multiSelectForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private vmData: VmService) {
    this.data = vmData.get();
    this.dataFields = Object.keys(this.data[0]);
    this.multiSelectForm = this.formBuilder.group({
      allRows: [false],
      currentPage: [1],
      pageSize: [10],
      rows: new FormGroup({}),
    });
    this.data.forEach(vm =>
      (this.multiSelectForm.controls.rows as FormGroup).addControl(vm.id, new FormControl(false))
    );
    this.multiSelectForm.controls.allRows.valueChanges.subscribe(value =>
      this.data.forEach(i => this.multiSelectForm.controls.rows.get(i.id)?.setValue(value))
    );
  }

  get selectedCount() {
    return this.data.map(i => this.multiSelectForm.controls.rows.get(i.id)?.value).filter((i: any) => i).length;
  }

  get selectedCdsVMs() {
    return this.data.map(i => {
      if (this.multiSelectForm.controls.rows.get(i.id)?.value) {
        return i;
      } else {
        return;
      }
    });
  }
}
