import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivatePage } from './private.page';
import {HistoryComponent} from "../../modals/history/history.component";
import {PasswordComponent} from "../../modals/password/password.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {InfosComponent} from "../../modals/infos/infos.component";
import { ListPartnerComponent } from 'src/app/modals/list-partner/list-partner.component';

const routes: Routes = [
  {
    path: '',
    component: PrivatePage
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  exports: [RouterModule,CommonModule],
  declarations: [HistoryComponent,InfosComponent,PasswordComponent, ListPartnerComponent],
  entryComponents: [HistoryComponent,PasswordComponent,InfosComponent, ListPartnerComponent]
})
export class PrivatePageRoutingModule {}

