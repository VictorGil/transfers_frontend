import { Injectable, OnInit } from '@angular/core';
import { Observable, Observer} from 'rxjs';
import { AppConfigService } from './appConfig.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  private webSocketsServerUrl: string;

  constructor(private appConfigService: AppConfigService) { }

  OnInit(): void {
    this.webSocketsServerUrl = this.appConfigService.webSocketsServerUrl;
  }

  public connect(url: string): void {

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
