import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionsListPageRoutingModule } from './collections-list-routing.module';

import { CollectionsListPage } from './collections-list.page';
import {HeaderComponent} from "../../templates/header/header.component";

registerLocaleData(localeFr);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionsListPageRoutingModule
  ],
  exports: [HeaderComponent],
  declarations: [CollectionsListPage, HeaderComponent],
  providers: [DatePipe, {provide: LOCALE_ID, useValue: 'fr-FR'}]
})
export class CollectionsListPageModule {}
