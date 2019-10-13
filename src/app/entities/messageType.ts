// It must match:
// tslint:disable-next-line:max-line-length
// https://github.com/VictorGil/transfers_websockets_service/blob/master/src/main/java/net/devaction/kafka/transferswebsocketsservice/message/MessageType.java
export enum MessageType {

  BALANCE_DATA_REQUEST = 'BALANCE_DATA_REQUEST',
  BALANCE_DATA_RESPONSE = 'BALANCE_DATA_RESPONSE',

  // A request for a balance data subscription based on an account id
  BALANCE_DATA_SUBSCRIPTION = 'BALANCE_DATA_SUBSCRIPTION',
  BALANCE_DATA_UPDATE = 'BALANCE_DATA_UPDATE',

  // A request for a transfers data subscription based on an account id
  TRANSFER_DATA_SUBSCRIPTION = 'TRANSFER_DATA_SUBSCRIPTION',
  TRANSFER_DATA_UPDATE = 'TRANSFER_DATA_UPDATE',

  // These two are not used so far
  TRANSFER_DATA_REQUEST = 'TRANSFER_DATA_REQUEST',
  TRANSFER_DATA_RESPONSE = 'TRANSFER_DATA_RESPONSE'
}
