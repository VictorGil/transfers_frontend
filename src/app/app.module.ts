import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { AppConfigService } from './appConfig.service';
import { HttpClientModule } from '@angular/common/http';
import { AccountBalanceFormComponent } from './account-balance-form/account-balance-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisplayBalanceComponent } from './display-balance/display-balance.component';
import { DisplayTransfersComponent } from './display-transfers/display-transfers.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountBalanceFormComponent,
    DisplayBalanceComponent,
    DisplayTransfersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        };
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
