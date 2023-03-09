import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';



const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pay',
    loadChildren: () => import('./pages/pay/pay.module').then(m => m.PayPageModule)
  },
  {
    path: 'cashment',
    loadChildren: () => import('./pages/collection/collection.module').then(m => m.QrcodeScanPageModule)
  },
  {
    path: 'private',
    loadChildren: () => import('./pages/private/private.module').then(m => m.PrivatePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'forgot-pwd',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'mail-check',
    loadChildren: () => import('./pages/mail-check/mail-check.module').then(m => m.MailCheckPageModule)
  },
  {
    path: 'collections-list',
    loadChildren: () => import('./pages/collections-list/collections-list.module').then( m => m.CollectionsListPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'mail-check',
    loadChildren: () => import('./pages/mail-check/mail-check.module').then( m => m.MailCheckPageModule)
  },
  {
    path: 'save-payment',
    loadChildren: () => import('./pages/save-payment/save-payment.module').then( m => m.SavePaymentPageModule)
  },  {
    path: 'refresher',
    loadChildren: () => import('./pages/refresher/refresher.module').then( m => m.RefresherPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
