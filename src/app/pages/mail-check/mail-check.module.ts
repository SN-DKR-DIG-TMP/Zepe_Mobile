import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MailCheckPageRoutingModule } from './mail-check-routing.module';

import { MailCheckPage } from './mail-check.page';
import { InputModule } from 'src/app/components/input/input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputModule,
    ReactiveFormsModule,
    MailCheckPageRoutingModule
  ],
  declarations: [MailCheckPage]
})
export class MailCheckPageModule {}
