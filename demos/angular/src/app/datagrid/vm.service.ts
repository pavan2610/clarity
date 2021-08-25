import { Injectable } from '@angular/core';
import { getVMData, TestVM } from '@cds/core/demo';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VmService {
  private readonly data: TestVM[] = [];

  constructor() {
    this.data = getVMData();
  }

  public get fields() {
    return Object.keys(this.data[0]);
  }

  public get(): TestVM[] {
    return this.data;
  }

  public asyncGet(delayTime: number = 500): Observable<TestVM[]> {
    return of(this.data).pipe(delay(delayTime));
  }
}
