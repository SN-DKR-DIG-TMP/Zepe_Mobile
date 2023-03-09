import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivatePageRoutingModule } from './private-routing.module';

import { PrivatePage } from './private.page';
import {PayPageModule} from "../pay/pay.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PrivatePageRoutingModule,
        PayPageModule
    ],
  declarations: [PrivatePage]
})
export class PrivatePageModule {}
