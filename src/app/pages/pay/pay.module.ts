import {LOCALE_ID, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayPageRoutingModule } from './pay-routing.module';

import { PayPage } from './pay.page';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';
import {HeaderComponent} from "../../templates/header/header.component";
import {registerLocaleData} from "@angular/common";
import localFr from '@angular/common/locales/fr';

registerLocaleData(localFr);

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PayPageRoutingModule,
        NgxQRCodeModule
    ],
    exports: [
        HeaderComponent
    ],
    declarations: [PayPage, HeaderComponent],
    providers: [{provide: LOCALE_ID, useValue: 'fr-FR'}]
})
export class PayPageModule {}
