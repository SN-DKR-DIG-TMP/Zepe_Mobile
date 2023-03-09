import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  NgForm,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import {
  AlertController,
  IonInput,
  LoadingController,
  ModalController,
  Platform,
} from "@ionic/angular";
import { CollectionsModel } from "src/app/models/collections.model";
import { PartnerModel } from "src/app/models/partner.model";
import { PaymentTokenDTO } from "src/app/models/PaymentTokenDTO.model";
import { User } from "src/app/models/user";
import { AccountService } from "src/app/services/account/account.service";
import { CollectionService } from "src/app/services/collection.service";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-save-payment",
  templateUrl: "./save-payment.page.html",
  styleUrls: ["./save-payment.page.scss"],
})
export class SavePaymentPage implements OnInit {
  amount: number;
  total = 0;
  operationStatus = "";
  public collections: any[];
  account: User = null;
  currentDate: string;
  qrcodeDataObj: any;
  totalValueToCome: number;
  isValid = true;
  minimum_amount: number = 100;

  constructor(
    private collectionService: CollectionService,
    //private storage: Storage,
    private accountService: AccountService,
    public alertController: AlertController,
    private router: Router,
    private datePipe: DatePipe,
    private platform: Platform,
    private utilsService: UtilsService,
    private loadingController: LoadingController
  ) {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation.extras.state as {
        qrcodeDataObj: any,
    };

    if (state.qrcodeDataObj) {
      this.qrcodeDataObj = state.qrcodeDataObj;
    }
  }

  @ViewChild("amountInput") amountInput: IonInput;

  onSubmit() {
    this.qrcodeDataObj.value = this.amount;
    if(this.amount >= this.minimum_amount){
      this.registerCollection(this.qrcodeDataObj);
      this.router.navigate(['/cashment']);
    }
    else{
      this.utilsService.presentAlert("Le montant minimum autorisé est de" + this.minimum_amount + "Fcfa");
    }
    console.log(this.qrcodeDataObj);
  }
  ngOnInit() {
    this.accountService.getConfigPerPartner(this.accountService.account.idPartner).subscribe(data => {
      this.minimum_amount = data[0].valeur;
      console.log(data[0].valeur);
  })
    this.collectionService.calculateSum();
        this.accountService.accountObservable.subscribe(data => {
            this.account = data;
        });

        this.collectionService.totalCollection.subscribe(data => {
            this.total = data;
        });
  }

  private registerCollection(QrValues: any) {
    this.currentDate = this.datePipe.transform(
      new Date(),
      "dd/MM/yyyy HH:mm:ss"
    );
    this.loadingController
      .create({
        cssClass: "my-loading-class",
      })
      .then((loading) => {
        loading.present().then();
        this.totalValueToCome = (this.qrcodeDataObj.totalAmount - (this.amount + this.qrcodeDataObj.totalConso));
          if(this.totalValueToCome < 0){
            if((this.totalValueToCome + this.qrcodeDataObj.amountExceedAutorised) < 0){
              loading.dismiss().then();
              this.utilsService.presentAlert("Le client a dépassé le montant autorisé.");
            }
            else{
              const { trade, collectionModel } = this.createCollectionModel(QrValues);
              this.collectionService
              .postCollectionToBacKend(collectionModel)
              .subscribe(
                () => {
                  loading.dismiss().then();
                  trade.name = this.account.partner;
                  this.collectionService.addCollectionToList(collectionModel);
                  console.log("Accépté sur le dépassement");
                  this.utilsService.presentAlert("Opération validée");
                },
                (error) => {
                  loading.dismiss().then();
                  const message = "Echec de l'opération";
                  this.utilsService.errorStatusFromBackend(error, message);
                }
              );
            }
          }
          else{
            const { trade, collectionModel } = this.createCollectionModel(QrValues);
            this.collectionService
            .postCollectionToBacKend(collectionModel)
            .subscribe(
              () => {
              loading.dismiss().then();
              trade.name = this.account.partner;
              this.collectionService.addCollectionToList(collectionModel);
              this.utilsService.presentAlert("Opération validée");
              },
              (error) => {
                loading.dismiss().then();
                const message = "Echec de l'opération";
                this.utilsService.errorStatusFromBackend(error, message);
              }
            );
          }
      });
  }

  private createCollectionModel(QrValues: any) {
    const business = new PartnerModel(
      QrValues.idPartenaire,
      QrValues.partenaire,
      null
    );

    const trade = new PartnerModel(this.account.idPartner, null, null);

    const tokenPayement = new PaymentTokenDTO(null, QrValues.token, null);

    const collectionModel = new CollectionsModel(
      business,
      QrValues.matricule,
      this.account.username,
      trade,
      tokenPayement,
      QrValues.value,
      QrValues.firebaseToken,
      this.currentDate,
      QrValues.customerFullName,
      this.account.firstName + " " + this.account.lastName,
      this.isValid
    );
    return { trade, collectionModel };
  }
  onAccueil(){
    this.router.navigateByUrl('/cashment',  { replaceUrl: true });    
}
  ionViewDidEnter() {
    this.utilsService.closeApp();
  }

  ionViewWillLeave() {
    this.utilsService.unSubscribeToExitButton();
  }
}
