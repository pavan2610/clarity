import { Component, OnInit } from '@angular/core';
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

  clrNgSelected: TestVM[] = [];
  // Form group for the generated form controls
  // A list of test VM's to display in a grid
  data: TestVM[] = [];
  // Extracted 'fields' from a row of data -> These will become columns
  dataFields!: string[];

  paginationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private vmData: VmService) {
    this.data = vmData.get();
    this.dataFields = Object.keys(this.data[0]);
    this.paginationForm = this.formBuilder.group({
      allRows: [false],
      currentPage: [1],
      pageSize: [10],
      rows: new FormGroup({}),
    });
    this.data.forEach(vm => (this.paginationForm.controls.rows as FormGroup).addControl(vm.id, new FormControl(false)));
    this.paginationForm.controls.allRows.valueChanges.subscribe(value =>
      this.data.forEach(i => this.paginationForm.controls.rows.get(i.id)?.setValue(value))
    );
    console.log(this.paginationForm);
  }

  get selectedCount() {
    return this.data.map(i => this.paginationForm.controls.rows.get(i.id)?.value).filter((i: any) => i).length;
  }

  nextPage() {
    const page = this.paginationForm.controls.currentPage.value;
    if (page <= this.pageCount) {
      this.paginationForm.controls.currentPage.setValue(page + 1);
    }
  }

  get pageCount() {
    return Math.ceil(this.data.length / this.paginationForm.controls.pageSize.value);
  }
  previousPage() {
    const page = this.paginationForm.controls.currentPage.value;
    if (page > 0) {
      this.paginationForm.controls.currentPage.setValue(page - 1);
    }
  }
}
