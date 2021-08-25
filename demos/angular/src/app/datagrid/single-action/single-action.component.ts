import { Component } from '@angular/core';
import { TestVM } from '@cds/core/demo';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { VmService } from '../vm.service';

@Component({
  selector: 'app-multi-action',
  templateUrl: './single-action.component.html',
  styleUrls: ['./single-action.component.scss'],
})
export class SingleActionComponent {
  // Form group for the generated form controls
  // hideShowForm!: FormGroup;
  // reference to the click event target for positioning the popover ui w/ hide/show checkboxes
  actionPopoverAnchor: EventTarget | null = null;
  // A list of test VM's to display in a grid
  data: TestVM[] = [];
  // Extracted 'fields' from a row of data -> These will become columns
  dataFields!: string[];
  // a boolean flag to control column picker element visibility
  hiddenColumnPicker = true;

  selectedRow!: TestVM | null;

  hiddenRowAction = true;

  constructor(private formBuilder: FormBuilder, private vmData: VmService) {
    this.data = vmData.get();
    this.dataFields = Object.keys(this.data[0]);
  }

  shutdownVM(vm?: TestVM | null) {
    alert(`Shutdown: ${vm?.id}`);
    this.closeRowActionPopover();
    this.selectedRow = null;
  }

  restartVM(vm: TestVM | null) {
    alert(`Restarted: ${vm?.id}`);
    this.closeRowActionPopover();
    this.selectedRow = null;
  }

  showRowActions(event: Event, vm: TestVM) {
    this.selectedRow = vm;
    this.actionPopoverAnchor = event.target;
    this.hiddenRowAction = false;
  }

  closeRowActionPopover() {
    this.selectedRow = null;
    this.hiddenRowAction = true;
  }

  clrAction(action: string, vm: TestVM) {
    alert(`${action}: ${vm.id}`);
  }
}
