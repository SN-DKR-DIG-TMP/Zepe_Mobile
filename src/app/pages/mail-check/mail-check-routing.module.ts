import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MailCheckPage } from './mail-check.page';

const routes: Routes = [
  {
    path: '',
    component: MailCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailCheckPageRoutingModule {}
