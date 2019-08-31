import { Component } from '@angular/core';

import { WebSocketsService } from '../websockets.service';

@Component({
  selector: 'app-account-balance-form',
  templateUrl: './account-balance-form.component.html',
  styleUrls: ['./account-balance-form.component.css']
})
export class AccountBalanceFormComponent {
  private webSocketsService: WebSocketsService;

  constructor(webSocketsService: WebSocketsService) {
    this.webSocketsService = webSocketsService;
  }

  onUserInputChange({ target }) {
    console.debug('Value of the input change event: %o', target.value);
    console.debug('Type of the input change event: %o', typeof target.value);
  }
}
