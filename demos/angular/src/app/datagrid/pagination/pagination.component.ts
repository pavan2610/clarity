import { Component, OnInit } from '@angular/core';
import { paginate, TestVM } from '@cds/core/demo';
import { VmService } from '../vm.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  data: TestVM[] = [];
  dataFields!: string[];
  paginatedList: TestVM[] = [];
  currentPage = 0;
  pageSize = 10;

  setPageSize(event: Event) {
    this.pageSize = parseInt((event.target as HTMLSelectElement).value);
    this.paginateData();
  }
  getPageSize(): number {
    return this.pageSize;
  }
  pageCount = 1;

  constructor(private vmData: VmService) {
    this.data = vmData.get();
    this.dataFields = vmData.fields;
    this.paginateData();
  }

  ngOnInit(): void {}

  boolTest = false;

  private paginateData() {
    this.pageCount = Math.ceil(this.data.length / this.pageSize);
    this.paginatedList = paginate(this.data, this.pageSize)[this.currentPage] ?? [];
  }

  public setPage(event: any) {
    this.currentPage = parseInt(event.target.value) - 1;
    this.paginateData();
  }

  public nextPage() {
    if (this.currentPage < this.pageCount - 1) {
      this.currentPage++;
      this.paginateData();
    }
  }

  public prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.paginateData();
    }
  }

  public firstPage() {
    this.currentPage = 0;
    this.paginateData();
  }

  public lastPage() {
    this.currentPage = Math.ceil(this.data.length / this.pageSize) - 1;
    this.paginateData();
  }
}
