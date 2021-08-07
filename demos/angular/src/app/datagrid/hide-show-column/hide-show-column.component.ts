import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ColumnTypes, TestVM } from '@cds/core/demo';
import { VmService } from '../vm.service';

@Component({
  selector: 'app-hide-show-column',
  templateUrl: './hide-show-column.component.html',
  styleUrls: ['./hide-show-column.component.scss'],
})
export class HideShowColumnComponent {
  ColumnTypes = ColumnTypes;
  // Form group for the generated form controls
  hideShowForm!: FormGroup;
  // reference to the click event target for positioning the popover ui w/ hide/show checkboxes
  columnAnchor: EventTarget | null = null;
  // A list of test VM's to display in a grid
  data: TestVM[] = [];
  // Extracted 'fields' from a row of data -> These will become columns
  dataFields!: string[];
  // a boolean flag to control column picker element visibility
  hiddenColumnPicker = true;
  // A subscription that can observe changes to the controls in the form group
  subscription!: Subscription;

  // a private var w/ set/get functions so that it can keep track of the all selected state in the form
  // private allSelected!: boolean;
  // get allSelectedState(): boolean {
  //   return (this.hideShowForm.controls.columns as FormGroup);
  // }
  // set allSelectedState(value: boolean) {
  //   this.allSelected = value;
  // }

  getControlValue(column: string) {
    return this.hideShowForm.controls.columns.get(column)?.value;
  }

  isColumnVisible(columnType: string): boolean {
    return this.hideShowForm.controls.columns.get(columnType)?.value;
  }

  get allColumnsVisible() {
    return !!this.dataFields
      .map(column => this.hideShowForm.controls.columns.get(column)?.value)
      .filter(value => !value).length;
  }

  constructor(private formBuilder: FormBuilder, private vmData: VmService) {
    // Fetch Data.
    this.data = vmData.get();
    this.dataFields = Object.keys(this.data[0]);
    this.hideShowForm = this.formBuilder.group({
      columns: new FormGroup({}),
    });
    this.dataFields.forEach(df =>
      (this.hideShowForm.controls.columns as FormGroup).addControl(df, new FormControl(true, { updateOn: 'change' }))
    );
  }

  setAnchor(event: Event) {
    this.columnAnchor = event.target;
    this.hiddenColumnPicker = !this.hiddenColumnPicker;
  }

  showAllColumns() {
    this.dataFields.forEach(column => this.hideShowForm.controls.columns.get(column)?.setValue(true));
  }
}
