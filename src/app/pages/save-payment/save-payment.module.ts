import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavePaymentPageRoutingModule } from './save-payment-routing.module';

import {HeaderComponent} from "../../templates/header/header.component";

import { SavePaymentPage } from './save-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavePaymentPageRoutingModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [SavePaymentPage, HeaderComponent]
})
export class SavePaymentPageModule {}
