// It must match:
// tslint:disable-next-line:max-line-length
// https://github.com/VictorGil/transfers_websockets_service/blob/master/src/main/java/net/devaction/kafka/transferswebsocketsservice/message/MessageType.java
export enum MessageType {

  BALANCE_DATA_REQUEST = 'BALANCE_DATA_REQUEST',
  BALANCE_DATA_RESPONSE = 'BALANCE_DATA_RESPONSE',

  // A request for a balance data subscription
  BALANCE_DATA_SUBSCRIPTION = 'BALANCE_DATA_SUBSCRIPTION',
  BALANCE_DATA_UPDATE = 'BALANCE_DATA_UPDATE',

  TRANSFER_DATA_SUBSCRIPTION = 'TRANSFER_DATA_SUBSCRIPTION',
  TRANSFER_DATA = 'TRANSFER_DATA'
}
