import { Injectable } from '@angular/core';

import { Observer, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputDisplayCommService {
  private clearBalanceSubject: Subject<void>;

  constructor() {
    this.clearBalanceSubject = new Subject<void>();
  }

  public subscribeToClearBalance(observer: Observer<void>): void {
    this.clearBalanceSubject.subscribe(observer);
  }

  public clearBalance(): void {
    this.clearBalanceSubject.next();
  }
}
