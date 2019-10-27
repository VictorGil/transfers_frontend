import { Component, OnInit } from '@angular/core';

import { Transfer } from '../entities/transfer';

import { WebSocketsService } from '../websockets.service';
import { InputDisplayCommService} from '../inputDisplayComm.service';

import { Observer} from 'rxjs';

@Component({
  selector: 'app-display-transfers',
  templateUrl: './display-transfers.component.html',
  styleUrls: ['./display-transfers.component.css']
})
export class DisplayTransfersComponent implements OnInit {

  readonly transfers: Array<Transfer> = new Array<Transfer>();

  private currentAccountId: string;

  private readonly webSocketsService: WebSocketsService;
  private readonly inputDisplayCommService: InputDisplayCommService;

  constructor(webSocketsService: WebSocketsService,
      inputDisplayCommService: InputDisplayCommService) {

    this.webSocketsService = webSocketsService;
    this.inputDisplayCommService = inputDisplayCommService;
  }

  ngOnInit(): void {
    // we need the "self" constant because we cannot use "this" inside the functions below
    const self = this;

    const accountIdEnteredObserver: Observer<string> = {
      next: function(accountId: string): void {
        self.currentAccountId = accountId;
      },

      error: function(err: any): void {
        console.error('Error: %o', err);
      },

      complete: function(): void {
        console.log('Observer completed, no more account ids coming from the user');
      }
    };
    this.inputDisplayCommService.subscribeToAccountIdEntered(accountIdEnteredObserver);

    // Empty the array
    this.transfers.length = 0;

    const transferReceivedObserver: Observer<Transfer> = {
      next: function(transfer: Transfer): void {
        self.process(transfer);
      },

      error: function(err: any): void {
        console.error('Error: %o', err);
      },

      complete: function(): void {
        console.log('Observer completed, no more Transfer data messages coming from the server');
      }

    };
    this.webSocketsService.subscribeToTransfers(transferReceivedObserver);
  }

  private process(transfer: Transfer): void {
    if (transfer.accountId === this.currentAccountId) {
      console.error('The account id of the received transfer object is not the expected one, '
          + 'expected: ' + this.currentAccountId + ', received: ' + transfer.accountId );
      return;
    }

    this.transfers.push(transfer);
    this.transfers.sort((transfer1, transfer2) => {
          if (transfer1.transferTS > transfer2.transferTS) {
            return 1;
          }

          if (transfer1.transferTS < transfer2.transferTS) {
            return -1;
          }

          return 0;
        });
  }

  trackByFn(index: number, transfer: Transfer): string {
    return transfer.id;
  }
}
