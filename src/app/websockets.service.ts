import { Injectable} from '@angular/core';
import { Observable, Observer} from 'rxjs';

import { AppConfigService } from './appConfig.service';
import { MessageWrapper } from './entities/messageWrapper';
import { MessageType } from './entities/messageType';

import { AccountBalance } from './entities/accountBalance';
import { TransferReceived } from './entities/transferReceived';
import { Transfer } from './entities/transfer';

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {
  private webSocket: WebSocket;

  constructor(private appConfigService: AppConfigService) { }

  public start(): void {
    this.connect(this.appConfigService.webSocketsServerUrl);
  }

  public stop(): void {
    if (this.webSocket != null) {
      this.webSocket.close();
    }
  }

  private connect(url: string): void {
    this.webSocket = new WebSocket(url);

    this.webSocket.onopen = function(messageEvent: MessageEvent) {
      // tslint:disable-next-line:no-console
      console.info('WebSocket connection has been opened: %o', messageEvent);
    };

    this.webSocket.onmessage = function(messageEvent: MessageEvent) {
      const jsonReceived: string = messageEvent.data;

      // tslint:disable-next-line:no-console
      console.debug('WebSocket message received: %s', jsonReceived);

      let messageWrapper: MessageWrapper;
      try {
        messageWrapper = JSON.parse(jsonReceived);
      } catch (error) {
        console.error('Unable to parse received JSON string: %s\n%o',
            jsonReceived, error);
        return;
      }

      if (!messageWrapper.hasOwnProperty('type') ||
            !messageWrapper.hasOwnProperty('payload')) {
          console.error('Invalid message received, not the correct properties: %s',
              jsonReceived);
          return;
      }

      if (messageWrapper.type === MessageType.BALANCE_DATA) {
        let accountBalance: AccountBalance;
          try {
            accountBalance = JSON.parse(messageWrapper.payload);
          } catch (error) {
            console.error('Unable to deserialize AccountBalance object: %s',
                messageWrapper.payload);
            return;
          }
        // tslint:disable-next-line:no-console
        console.debug('AccountBalance message received: %o', accountBalance);

      } else {
        if (messageWrapper.type === MessageType.TRANSFER_DATA) {
          let transferReceived: TransferReceived;
          try {
            transferReceived = JSON.parse(messageWrapper.payload);
          } catch (error) {
            console.error('Unable to deserialize Transfer object: %s',
                messageWrapper.payload);
          }

          const transfer: Transfer = new Transfer(transferReceived);
          // tslint:disable-next-line:no-console
          console.debug('Transfer message received: %o', transfer);

        } else {
          console.error('Invalid message type: %s', messageWrapper.type);
        }
      }
    };

    this.webSocket.onerror = function(messageEvent: MessageEvent) {
      console.error('WebSocket error observed: %o', messageEvent);
    };

    this.webSocket.onclose = function(closeEvent: CloseEvent) {
      // tslint:disable-next-line:no-console
      console.info('WebSocket connection has been closed: %o', closeEvent);
    };
  }

  public subscribeToBalanceUpdates(accountIds: Array<string>): void {

  }

  public subscribeToNewTransfers(accountIds: Array<string>): void {

  }

  public requestBalance(accountId: string): void {

  }

  public requestTransferInfo(transferId: string): void {

  }
}
