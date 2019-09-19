import { Injectable} from '@angular/core';
import { Observable, Observer, Subject} from 'rxjs';

import { AppConfigService } from './appConfig.service';
import { MessageWrapper } from './entities/messageWrapper';
import { MessageType } from './entities/messageType';

import { AccountBalance } from './entities/accountBalance';
import { AccountBalanceRequest } from './entities/accountBalanceRequest';
import { TransferReceived } from './entities/transferReceived';
import { Transfer } from './entities/transfer';

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {
  private webSocket: WebSocket;

  // Maybe we only need one balance subject
  private balanceResponseSubject: Subject<AccountBalance>;
  private balanceUpdateSubject: Subject<AccountBalance>;

  private transferResponseSubject: Subject<Transfer>;

  constructor(private appConfigService: AppConfigService) {
    this.balanceResponseSubject = new Subject<AccountBalance>();
    this.balanceUpdateSubject = new Subject<AccountBalance>();
    this.transferResponseSubject = new Subject<Transfer>();
  }

  public start(): void {
    console.debug('Going to connect to the websockets server');
    this.connect(this.appConfigService.webSocketsServerUrl);
  }

  public stop(): void {
    if (this.webSocket != null) {
      this.webSocket.close();
    }
  }

  public subscribeToBalanceResponse(observer: Observer<AccountBalance>): void {
    this.balanceResponseSubject.subscribe(observer);
  }

  private connect(url: string): void {
    this.webSocket = new WebSocket(url);

    this.webSocket.onopen = function(messageEvent: MessageEvent) {
      console.info('WebSocket connection has been opened: %o', messageEvent);
    };

    // we need the "self" constant because we cannot use "this" inside the function below
    const self = this;

    const onMessage =  function(messageEvent: MessageEvent) {
      const jsonReceived: string = messageEvent.data;

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

      if (messageWrapper.type === MessageType.BALANCE_DATA_RESPONSE ||
          messageWrapper.type === MessageType.BALANCE_DATA_UPDATE) {
        let accountBalance: AccountBalance;
        try {
          accountBalance = JSON.parse(messageWrapper.payload);
        } catch (error) {
          console.error('Unable to deserialize AccountBalance object: %s',
              messageWrapper.payload);
          return;
        }

        console.debug('AccountBalance message received: %o', accountBalance);
        if (messageWrapper.type === MessageType.BALANCE_DATA_RESPONSE) {
          self.balanceResponseSubject.next(accountBalance);
        }

        if (messageWrapper.type === MessageType.BALANCE_DATA_UPDATE) {
          self.balanceUpdateSubject.next(accountBalance);
        }
      } else {
        if (messageWrapper.type === MessageType.TRANSFER_DATA_RESPONSE) {
          let transferReceived: TransferReceived;
          try {
            transferReceived = JSON.parse(messageWrapper.payload);
          } catch (error) {
            console.error('Unable to deserialize Transfer object: %s',
                messageWrapper.payload);
          }

          const transfer: Transfer = new Transfer(transferReceived);
          console.debug('Transfer message received: %o', transfer);
          self.transferResponseSubject.next(transfer);

        } else {
          console.error('Invalid message type: %s', messageWrapper.type);
        }
      }
    };

    this.webSocket.onmessage = onMessage;

    this.webSocket.onerror = function(messageEvent: MessageEvent) {
      console.error('WebSocket error observed: %o', messageEvent);
    };

    this.webSocket.onclose = function(closeEvent: CloseEvent) {
      console.info('WebSocket connection has been closed: %o', closeEvent);
    };
  }

  public sendAccountBalanceRequest(accountId: string): void {
    const request: AccountBalanceRequest = new AccountBalanceRequest(accountId);
    const message: MessageWrapper = new MessageWrapper(MessageType.BALANCE_DATA_REQUEST, request);
    try {
      this.webSocket.send(JSON.stringify(message));
    } catch (error) {
      console.error('Sending message failed.\nMessage:\n%o\nError:\n%o', message, error);
    }
  }

  public subscribeToBalanceUpdates(accountIds: Array<string>): void {
    // TODO
  }

  public subscribeToNewTransfers(accountIds: Array<string>): void {
    // TODO
  }

  public sendTransferInfoRequest(transferId: string): void {
    // TODO
  }
}
