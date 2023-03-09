import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Notification} from "../../models/notification.model";
import {INotificationPayload} from "cordova-plugin-fcm-with-dependecy-updated";
import {not} from "rxjs/internal-compatibility";
import {PaymentService} from "../payment/payment.service";
import {Payment} from "../../models/payment.model";
import {PartnerModel} from "../../models/partner.model";
import {UtilsService} from "../utils.service";
import {DatePipe} from "@angular/common";
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  private generatedQr = new BehaviorSubject<boolean>(false);

  constructor(
      private paymentService: PaymentService,
      private utilsService: UtilsService,
      private navCtrl: NavController
  ) { }

  newNotification(notification: INotificationPayload,dateNotif){
          
    this.paymentService.addPayment(new Payment(0,notification.account, new PartnerModel(notification.idPartner,notification.partnerName,notification.partnerAdress),dateNotif),notification.paymentToken);
    this.setRegenerateQr(false);
    this.utilsService.presentAlert("Paiement Effectué avec succès!").then();
    this.refresh();
    //this.navCtrl.navigateRoot('pay');
  }
   getRegenerateTokenAsObs(){
    return this.generatedQr.asObservable();
  }

  setRegenerateQr(regenrerate: boolean){
    this.generatedQr.next(regenrerate);
  }

  refresh(){
    setTimeout(() =>{
      //console.log('Nav To Private');
      this.navCtrl.navigateForward('refresher');
    }, 1)
    
    setTimeout(() =>{
      //console.log('Nav To Pay');
      this.navCtrl.navigateForward('pay');
    }, 1)
  }

}
