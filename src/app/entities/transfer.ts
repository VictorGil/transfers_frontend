import { TransferReceived } from './transferReceived';

export class Transfer {
  readonly id: string;
  readonly accountId: string;
  readonly amount: number;
  readonly transferTS: number;
  readonly transferTSstring: string;

  constructor(transferReceived: TransferReceived) {

    this.id = transferReceived.id;
    this.accountId = transferReceived.accountId;
    this.amount = transferReceived.amount;

    this.transferTS = transferReceived.transferTS;
    const transferDate: Date = new Date(0);
    transferDate.setUTCSeconds(this.transferTS);
    this.transferTSstring = transferDate.toString();
  }
}
