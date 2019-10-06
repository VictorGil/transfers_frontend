import { Component, OnInit } from '@angular/core';

import { WebSocketsService } from '../websockets.service';

import { AccountBalance } from '../entities/accountBalance';

import { Observer} from 'rxjs';

@Component({
  selector: 'app-display-balance',
  templateUrl: './display-balance.component.html',
  styleUrls: ['./display-balance.component.css']
})
 export class DisplayBalanceComponent implements OnInit {

  balance: string;
  showBalance: boolean;

  private currentBalanceVersion: number;
  private webSocketsService: WebSocketsService;

  constructor(webSocketsService: WebSocketsService) {
    this.webSocketsService = webSocketsService;
  }

  ngOnInit(): void {
    this.currentBalanceVersion = -1;

    console.debug('Creating the account balance response observer');
    // we need the "self" constant because we cannot use "this" inside the functions below
    const self = this;
    const balanceResponsesObserver: Observer<AccountBalance> = {
      next: function(accountBalance: AccountBalance): void {
        self.process(accountBalance);
      },

      error: function(err: any): void {
        console.error('Error: %o', err);
      },

      complete: function(): void {
        console.log('No more account balance responses');
      }
    };

    this.webSocketsService.subscribeToBalanceResponses(balanceResponsesObserver);

    const balanceUpdatesObserver: Observer<AccountBalance> = {
      next: function(accountBalance: AccountBalance): void {
        self.process(accountBalance);
      },

      error: function(err: any): void {
        console.error('Error: %o', err);
      },

      complete: function(): void {
        console.log('No more account balance updates');
      }
    };

    this.webSocketsService.subscribeToBalanceUpdates(balanceUpdatesObserver);
  }

  private process(accountBalance: AccountBalance): void {
    console.debug('Account Balance received through the observer:\n%o', accountBalance);

    if (accountBalance.version > this.currentBalanceVersion) {
      if (this.currentBalanceVersion === -1) {
        this.showBalance = true;
      }

      this.balance = String(accountBalance.balance);
      this.currentBalanceVersion = accountBalance.version;
    }
  }
}
