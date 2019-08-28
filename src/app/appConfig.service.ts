import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;

  constructor(private httpClient: HttpClient) { }

  loadAppConfig(): Promise<string | void> {
    return this.httpClient.get('/assets/config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
    });
  }

  get webSocketsServerUrl(): string {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.webSocketsServerUrl;
  }
}
