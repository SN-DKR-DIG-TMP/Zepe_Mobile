import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService } from './account/account.service';

interface AppUpdate {
  current: string;
  enabled: boolean;
  majorMsg?: {
    title:string,
    msg:string,
    btn:string;
  }
}

@Injectable({
  providedIn: 'root'
})


export class UpdateService {
  updateLink = 'http://193.43.134.150:8999/version.json';
  

  constructor(private http: HttpClient,
    private alertCtrl: AlertController,
    private iab: InAppBrowser,
    private appVerion: AppVersion,
    private plt: Platform,
    private accountService: AccountService) { }

    async checkForUpdate() {
      this.accountService.getVersion().subscribe(async (value) => {
        if(!value['enabled']){
          console.log("Maintenance");
        } else {
          const versionNumber  = await this.appVerion.getVersionNumber();
          const splitVersionNumber = versionNumber.split('.');
          console.log("versionNumber"+versionNumber);          
          
          const serverVersion = value['current'].split('.');
          console.log("serverVersion");
          console.log(serverVersion);
          
          if(serverVersion[0] > splitVersionNumber [0]){
            this.presentAlert(value['majorMsg']['title'], value['majorMsg']['msg'], value['majorMsg']['btn']);
          } else if(serverVersion[1] > splitVersionNumber [1]){
            this.presentAlert(value['majorMsg']['title'], value['majorMsg']['msg'], value['majorMsg']['btn']);
          }else if(serverVersion[2] > splitVersionNumber [2]){
            this.presentAlert(value['majorMsg']['title'], value['majorMsg']['msg'], value['majorMsg']['btn']);
          }
        }
      })
    }

    openBrowser(){
      this.iab.create('http://zepeatos.ddns.net:8999/', '_system')
    }

    async presentAlert(header, message, buttontext = '', allowClose  = true){
      const buttons: any = [];

      if(buttontext != ''){
        buttons.push({
          text: buttontext,
          handler: () => {
            this.openBrowser();
          }
        });
      }

      if(allowClose){
        buttons.push({
          text: 'Fermer',
          role: 'cancel'
        });
      }
      const alert = await this.alertCtrl.create({
        header,
        message,
        buttons,
        backdropDismiss: allowClose
      });

      await alert.present();
    }
}
