import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage-angular';
import {SettingComponent} from './pages/popovers/setting/setting.component';
import {AuthInterceptor} from './http-interceptors/auth-interceptor';
import { PasswordPatternDirective } from './directives/password-pattern.directive';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { CommonModule, DatePipe } from '@angular/common';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

import { AppVersion } from "@ionic-native/app-version/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";


@NgModule({
    declarations: [AppComponent,
        SettingComponent,
        PasswordPatternDirective,
        MatchPasswordDirective],
    entryComponents: [SettingComponent],
    imports: [BrowserModule,
        CommonModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        IonicStorageModule.forRoot({
        name: '__mydb',
        driverOrder: ['indexeddb', 'sqlite', 'websql']})],
    providers: [
        StatusBar,
        SplashScreen,
        DatePipe,
        Storage,
        LaunchNavigator,
        AppVersion,
        InAppBrowser,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
