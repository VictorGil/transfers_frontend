import { Injectable } from '@angular/core';

import { Observer, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputDisplayCommService {
  private readonly clearBalanceSubject: Subject<void> = new Subject<void>();
  private readonly accountIdSubject: Subject<string> = new Subject<string>();

  public subscribeToClearBalance(observer: Observer<void>): void {
    this.clearBalanceSubject.subscribe(observer);
  }

  public subscribeToAccountIdEntered(observer: Observer<string>): void {
    this.accountIdSubject.subscribe(observer);
  }

  public clearBalance(): void {
    this.clearBalanceSubject.next();
  }

  public accountIdEntered(accountId: string): void {
    this.accountIdSubject.next(accountId);
  }
}
