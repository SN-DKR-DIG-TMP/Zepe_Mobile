import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrcodeScanPageRoutingModule } from './collection-routing.module';

import { CollectionPage } from './collection.page';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {HeaderComponent} from "../../templates/header/header.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrcodeScanPageRoutingModule
  ],
  exports: [HeaderComponent],
  declarations: [CollectionPage, HeaderComponent],
  providers: [BarcodeScanner]
})
export class QrcodeScanPageModule {}
