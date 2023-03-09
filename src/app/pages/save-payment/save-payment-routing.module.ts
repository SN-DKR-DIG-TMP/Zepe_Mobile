import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavePaymentPage } from './save-payment.page';

const routes: Routes = [
  {
    path: '',
    component: SavePaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavePaymentPageRoutingModule {}
