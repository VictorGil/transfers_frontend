export class AccountBalance {

  readonly accountId: string;
  readonly clientId: string;

  // this is the latest transfer recorded
  // for this account and balance
  readonly transferId: string;

  readonly balance: number;
  readonly version: number;
}
