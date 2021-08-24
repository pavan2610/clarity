import { Component, OnInit } from '@angular/core';
import { TestVM } from '@cds/core/demo';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { VmService } from '../vm.service';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
})
export class SingleSelectComponent {
  selectedItem!: TestVM;
  data: TestVM[] = [];
  dataFields!: string[];
  clrSelectedVM!: TestVM;
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
  }

  vmSelectChange(event: Event) {
    const vmInput: HTMLInputElement = event.target as HTMLInputElement;
    this.selectedItem = this.data.filter(i => i.id === vmInput.id)[0];
  }
}
