import { Component, OnInit } from "@angular/core";
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from "@techiediaries/ngx-qrcode";
import { AccountService } from "../../services/account/account.service";
import { JetonService } from "../../services/jeton/jeton.service";
import { QRValue } from "../../models/QRValue.model";
import { QRFullValue } from "../../models/QRFullValue.model";
import { User } from "../../models/user";
import { PaymentService } from "../../services/payment/payment.service";
import { Payment } from "../../models/payment.model";
import { PartnerConfigDTO } from "../../models/partnerConfigDTO.model";
import { Subscription } from "rxjs";
import { ModalController, NavController, Platform } from "@ionic/angular";
import { UtilsService } from "../../services/utils.service";
import { NotificationsService } from "../../services/notifications/notifications.service";
import { HistoryComponent } from "../../modals/history/history.component";
import { OverlayEventDetail } from "@ionic/core";
import { PaymentGrouped } from "src/app/models/paymentGrouped.model";
import {DatePipe, formatDate} from '@angular/common';
import { PayPageModule } from "./pay.module";
import { Router } from "@angular/router";
import { UpdateService } from "src/app/services/update.service";


@Component({
  selector: "app-pay",
  templateUrl: "./pay.page.html",
  styleUrls: ["./pay.page.scss"],
})
export class PayPage implements OnInit {
  generate = null;
  elementType = NgxQrcodeElementTypes.CANVAS;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = "";
  today = new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1).toString().slice(-2));

  historyMonth: Payment[] = [];
  account: User = null;
  partenaireConf: PartnerConfigDTO = null;
  private subscription: Subscription;

  history: Payment[] = null;
  nbrTickets: number;
  totalSubv: number;
  totalAmount: number;
  totalConso = 0;
  restAmount: number;
  nbrTicketConso = 0;
  amountExceedAutorised: number;

  date: any;
  firstDay: any;
  lastDay: any;

  constructor(
    private accountService: AccountService,
    private jetonService: JetonService,
    private platform: Platform,
    private utilsService: UtilsService,
    private navCtrl: NavController,
    private notifService: NotificationsService,
    private router: Router,
    private modalController: ModalController,
    private paymentService: PaymentService,
    private updateService:  UpdateService
  ) {

    this.date = new Date();
    this.firstDay = formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), 1), 'yyyy-MM-dd', 'en-US');
    this.lastDay = formatDate(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0), 'yyyy-MM-dd', 'en-US');
    
    /*this.paymentService
      .getAmountByUserAndTwoDate(this.lastDay, this.paymentService.paymentTokenDTO.userMatricule, this.firstDay)
      .subscribe((data) => {     
        data.forEach((element) => {
          if(element.isValid){
            this.totalConso += element.amount;
            this.nbrTicketConso++;
          }
        });
        // console.log("Nbr Conso"+this.totalConso);
        this.calculateConso();
      });*/
      this.amountExceedAutorised = this.jetonService.partnerConfigDTO.configs[2].intValue;
        
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.refreshAmounts();
      /*setTimeout(() =>{
        console.log('Nav To Private');
        this.navCtrl.navigateForward('refresher');
      }, 4)
      
      setTimeout(() =>{
        console.log('Nav To Pay');
        this.navCtrl.navigateForward('pay');
      }, 4)*/
      //this.navCtrl.navigateForward('pay');;
      //this.router.navigate(['/pay'], {replaceUrl: true})
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {
    this.onAccueil();
    this.updateService.checkForUpdate();
    console.log(this.jetonService.partnerConfigDTO.configs);
    
    this.paymentService.getHistoryObservable().subscribe((data) => {
      this.affectPayMonth(data);
    });
    this.accountService.accountObservable.subscribe((data) => {
      this.account = data;
    });
    this.jetonService.partnerConfigDTOObservable.subscribe((data) => {
      this.partenaireConf = data;
    });
    this.notifService.getRegenerateTokenAsObs().subscribe((data) => {
      this.generate = data;
    });
    this.paymentService.getHistoryObservable().subscribe((data) => {
      this.history = data;
    });
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

  refreshAmounts(){
    this.totalConso=0
    this.totalAmount=0
    this.restAmount = 0;
    this.paymentService
      .getAmountByUserAndTwoDate(this.lastDay, this.paymentService.paymentTokenDTO.userMatricule, this.firstDay)
      .subscribe((data) => {
        data.forEach((element) => {
         if(element.isValid){
            this.totalConso += element.amount;
            this.nbrTicketConso++;
          }
        });
        // console.log("Nbr Conso"+this.totalConso);
        this.calculateConso();
      });
  }

  
  onAccueil(){
    this.router.navigateByUrl('/pay',  { replaceUrl: true });
  }
  calculateConso() {
    this.nbrTickets = this.jetonService.partnerConfigDTO.configs[0].intValue;
    //console.log("Nbr T"+this.nbrTickets);

    this.totalSubv =
      this.jetonService.partnerConfigDTO.jetonEntreprise.montantEmploye +
      this.jetonService.partnerConfigDTO.jetonEntreprise.montantEntreprise;
    //console.log("Total Su"+this.totalSubv);

    this.totalAmount = this.nbrTickets * this.totalSubv;
    //console.log("T Amount"+this.totalAmount);

    this.restAmount = this.totalAmount - this.totalConso;
    //console.log("Rest"+this.restAmount);
  }

  pay() {
    const value =
      this.jetonService.partnerConfigDTO.jetonEntreprise.montantEmploye +
      this.jetonService.partnerConfigDTO.jetonEntreprise.montantEntreprise;

    const validation = !(
      this.historyMonth.length >= this.partenaireConf.configs[0].intValue
    );

    const qrValue: QRValue = new QRValue(
      this.account.username,
      this.account.idPartner,
      this.account.partner,
      this.accountService.firebaseToken,
      value,
      this.totalAmount,
      this.totalConso,
      this.amountExceedAutorised,
      this.paymentService.paymentTokenDTO.token,
      validation,
      this.account.firstName + " " + this.account.lastName
    );
    
   /* const qrValue: QRFullValue = new QRFullValue(
      this.account.username,
      this.account.idPartner,
      this.account.partner,
      this.accountService.firebaseToken,
      value,
      this.totalAmount,
      this.totalConso,
      this.amountExceedAutorised,
      this.payementService.paymentTokenDTO.token,
      validation,
      this.account.firstName + " " + this.account.lastName
    );
*/
    this.value = JSON.stringify(qrValue);
    this.generate = true;

    console.log(qrValue);
    
  }

  affectPayMonth(history: Payment[]) {
    if (history != [] && history.length > 0) {
      const PaymentsByDate = history.reduce((PaymentsByDate, day) => {
        let date: any;
        date = day.date.toString().slice(0, 7);
        if (date == this.today) {
          if (!PaymentsByDate[date]) {
            PaymentsByDate[date] = [];
          }
          PaymentsByDate[date].push(day);
        }
        return PaymentsByDate;
      }, {});
      if (!(typeof PaymentsByDate[this.today] === "undefined")) {
        this.historyMonth = PaymentsByDate[this.today];
      }
    }
  }

  cancel() {
    this.value = "";
    this.generate = false;
    //this.refresh();
  }

  ionViewWillEnter() { 
    this.refreshAmounts();
   }

  ionViewDidEnter() {
    this.utilsService.closeApp();
  }

  ionViewWillLeave() {
    this.utilsService.unSubscribeToExitButton();
  }

  onHistory() {
    this.modalController
      .create({ component: HistoryComponent })
      .then((modalEl) => {
        modalEl.present();
      });
  }
}
