import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observer} from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { WebSocketsService } from '../websockets.service';

@Component({
  selector: 'app-account-balance-form',
  templateUrl: './account-balance-form.component.html',
  styleUrls: ['./account-balance-form.component.css']
})
export class AccountBalanceFormComponent implements OnInit, OnDestroy {
  accountId = new FormControl('');

  private webSocketsService: WebSocketsService;

  constructor(webSocketsService: WebSocketsService) {
    this.webSocketsService = webSocketsService;
  }

  ngOnInit(): void {
    const onNewAccountId = function(accountId: string): void {
        console.debug('New "accountId": %s', accountId);
    };

    this.accountId.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged())
        .subscribe(onNewAccountId);
  }

  ngOnDestroy(): void {

  }

  onUserInputChange({ target }) {
    console.debug('Value of the input change event: %o', target.value);
    console.debug('Type of the input change event: %o', typeof target.value);
  }
}
