import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionsListPage } from './collections-list.page';

const routes: Routes = [
  {
    path: '',
    component: CollectionsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsListPageRoutingModule {}
