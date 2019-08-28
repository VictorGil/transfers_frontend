import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-account-balance-form',
  templateUrl: './account-balance-form.component.html',
  styleUrls: ['./account-balance-form.component.css']
})
export class AccountBalanceFormComponent {

  accountId = new FormControl('');
}
