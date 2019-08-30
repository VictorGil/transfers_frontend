import { Component, OnInit, OnDestroy} from '@angular/core';
import { WebSocketsService } from './websockets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private webSocketsService: WebSocketsService;

  readonly title = 'the Transfers UI';

  constructor(webSocketsService: WebSocketsService) {
    this.webSocketsService = webSocketsService;
  }

  ngOnInit(): void {
    this.webSocketsService.start();
  }

  ngOnDestroy(): void {
    this.webSocketsService.stop();
  }
}
