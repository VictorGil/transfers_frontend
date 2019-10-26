// Analogous Java class in the backend:
// https://github.com/VictorGil/transfers_api/blob/master/src/main/java/net/devaction/entity/TransferEntity.java

export class TransferReceived {
  readonly id: string;
  readonly accountId: string;
  readonly amount: number;
  readonly transferTS: number;
}
