export class AccountBalanceRequest {
    readonly accountId: string;

  constructor (accountId: string) {
    this.accountId = accountId;
  }
}
