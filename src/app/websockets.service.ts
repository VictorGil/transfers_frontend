import { Injectable} from '@angular/core';
import { Observable, Observer} from 'rxjs';
import { AppConfigService } from './appConfig.service';

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
      console.info('WebSocket connection has been opened: ', messageEvent);
    };

    this.webSocket.onmessage = function(messageEvent: MessageEvent) {
      // tslint:disable-next-line:no-console
      console.debug('WebSocket message received: ', messageEvent);
    };

    this.webSocket.onerror = function(messageEvent: MessageEvent) {
      console.error('WebSocket error observed: ', messageEvent);
    };

    this.webSocket.onclose = function(closeEvent: CloseEvent) {
      // tslint:disable-next-line:no-console
      console.info('WebSocket connection has been closed: ', closeEvent);
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
