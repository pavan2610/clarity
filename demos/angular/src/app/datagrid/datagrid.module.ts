import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DatagridRoutingModule } from './datagrid-routing.module';
import { DatagridComponent } from './datagrid.component';
import { BasicComponent } from './basic/basic.component';
import { HideShowColumnComponent } from './hide-show-column/hide-show-column.component';
import { MultiActionComponent } from './multi-action/multi-action.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PinColumnsComponent } from './pin-columns/pin-columns.component';
import { SingleActionComponent } from './single-action/single-action.component';
import { SingleSelectComponent } from './single-select/single-select.component';
import { SortingComponent } from './sorting/sorting.component';
import { FilteringComponent } from './filtering/filtering.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { DetailComponent } from './detail/detail.component';

import { CdsModule } from '@cds/angular';

import '@cds/core/grid/register.js';

@NgModule({
  declarations: [
    BasicComponent,
    DatagridComponent,
    FilteringComponent,
    HideShowColumnComponent,
    MultiActionComponent,
    MultiSelectComponent,
    SingleActionComponent,
    SingleSelectComponent,
    SortingComponent,
    PaginationComponent,
    PinColumnsComponent,
    DetailComponent,
  ],
  imports: [CommonModule, DatagridRoutingModule, ClarityModule, CdsModule],
})
export class DatagridModule {}
