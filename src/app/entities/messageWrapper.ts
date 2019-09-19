import { MessageType } from './messageType';
export class MessageWrapper {

  readonly type: string;
  readonly payload: string;

  constructor(messageType: MessageType, payload: Object) {
    this.type = messageType;
    this.payload = JSON.stringify(payload);
  }
}
