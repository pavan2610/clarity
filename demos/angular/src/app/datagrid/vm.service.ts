import { Injectable } from '@angular/core';
import { getVMData, TestVM } from '@cds/core/demo';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VmService {
  public get(): TestVM[] {
    return getVMData();
  }

  public asyncGet(delayTime: number = 500): Observable<TestVM[]> {
    return of(getVMData()).pipe(delay(delayTime));
  }
}
