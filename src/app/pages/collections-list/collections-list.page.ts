import { AfterViewInit, Component, OnInit } from "@angular/core";
import { CollectionService } from "../../services/collection.service";
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from "@ionic/angular";
import { DatePipe, formatDate } from "@angular/common";
import { UtilsService } from "../../services/utils.service";
import { PaymentService } from "src/app/services/payment/payment.service";
import { AccountService } from "src/app/services/account/account.service";
import { User } from "src/app/models/user";
import { async } from "rxjs/internal/scheduler/async";

@Component({
  selector: "app-collections-list",
  templateUrl: "./collections-list.page.html",
  styleUrls: ["./collections-list.page.scss"],
})
export class CollectionsListPage implements OnInit, AfterViewInit {
  public collections: any[];
  public totalOfCollections: number;
  public total: number;
  public collectionGroupedByDate: any[];
  public collectionList: any[];
  date: Date;
  account: User = null;
  cashment: any;
  cDatePipe: DatePipe;

  constructor(
    private collectionService: CollectionService,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private utilsService: UtilsService,
    private paymentService: PaymentService,
    private accountService: AccountService,
    public alertController: AlertController,
    private modalController: ModalController,
    private datePipe: DatePipe
  ) {
    this.accountService.accountObservable.subscribe((data) => {
      this.account = data;
      //console.log(this.account.username);
    });
    this.paymentService
      .getCashmentByCashierAndDate(
        this.account.username,
        /*formatDate(new Date(), 'yyyy-MM-dd', 'en-US')*/ "2021-12-07"
      )
      .subscribe((data) => {
        this.cashment = data;
        //console.log(this.cashment);
      });
  }

  ngOnInit() {
    this.collectionService.collectionsList.subscribe((list) => {
      this.collectionList = list;
      this.collections = list;
      this.collections.forEach((collection) => {
        this.totalOfCollections += collection.amount;
      });
    });
  }

  ngAfterViewInit() {
    this.date = new Date();
    this.totalOfCollections = 0;
    this.total = 0;
    this.getListOfCollection();
  }

  async presentAlert(messages: string, collection: any) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Notification",
      message: messages,
      buttons: [
        {
          text: "Ok",
          handler: () => {
            console.log("OK");
            if(Math.abs((new Date().getMinutes() - parseInt(collection.date.slice(14, 16)))) <= 30 || Math.abs(parseInt(collection.date.slice(14, 16))) - (new Date().getMinutes()) <= 30 && Math.abs(((new Date().getHours() - parseInt(collection.date.slice(11, 13))))) == 1){
                collection.isValid = false;
                this.paymentService.unValidCashment(collection).subscribe((data) => {
                    console.log(data);
                },(error) => {
                    console.log("Error" + error);
                });
            }else{
                this.presentErrorAlert("Vous ne pouvez plus supprimer cet encaissement")          
            }
            console.log("Current Hour: "+ new Date().getHours());
            //this.date = collection.date;
            console.log("Collection Hour: "+ parseInt(collection.date.slice(11, 13)));
            console.log("Time Between: "+ Math.abs((new Date().getMinutes() - parseInt(collection.date.slice(14, 16)))));
                      
          },
        },
      ],
    });

    await alert.present();
  }

  async presentErrorAlert(messages: string){
    const alert = await this.alertController.create({
        cssClass: "my-custom-class",
        header: "Notification",
        message: messages});
        await alert.present();
  }

  edit(collection: any) {
    this.presentAlert("Voulez vous vraiment annuler ce paiement ?", collection);
  }
  
  private getListOfCollection() {
    this.loadingController
      .create({
        cssClass: "my-loading-class",
      })
      .then((loading) => {
        loading.present().then();
        this.collectionService.collectionsList.subscribe(
          (result) => {
            loading.dismiss().then();
            if (result !== null && typeof result !== "undefined") {
              this.collections = result;
              this.collectionService.totalCollection.subscribe((total) => {
                this.totalOfCollections = total;
              });
            }
          },
          (error) => {
            this.utilsService
              .presentAlert(
                "Liste non disponible,veuillez réessayer ulterieurement!!!"
              )
              .then();
            loading.dismiss().then();
          }
        );
      });
  }

  goBack() {
    this.navCtrl.back();
  }

  cancel() {
    this.navCtrl.pop().then();
  }
}
