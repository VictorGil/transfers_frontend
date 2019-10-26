// Analogous Javqa class in the backend:
// https://github.com/VictorGil/transfers_api/blob/master/src/main/java/net/devaction/entity/AccountBalanceEntity.java

export class AccountBalance {

  readonly accountId: string;
  readonly clientId: string;

  // this is the latest transfer recorded
  // for this account and balance
  readonly transferId: string;

  readonly balance: number;
  readonly version: number;
}
