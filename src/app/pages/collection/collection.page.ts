import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {CollectionService} from '../../services/collection.service';
import {Storage} from '@ionic/storage';
import {AlertController, LoadingController, Platform} from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';
import {CollectionsModel} from '../../models/collections.model';
import {User} from '../../models/user';
import {AccountService} from '../../services/account/account.service';
import {PartnerModel} from '../../models/partner.model';
import {PaymentTokenDTO} from '../../models/PaymentTokenDTO.model';
import {DatePipe} from '@angular/common';
import {UtilsService} from '../../services/utils.service';
import { JetonService } from "../../services/jeton/jeton.service";
import { PartnerConfigDTO } from 'src/app/models/partnerConfigDTO.model';
import { UpdateService } from 'src/app/services/update.service';

@Component({
    selector: 'app-qrcode-scan',
    templateUrl: './collection.page.html',
    styleUrls: ['./collection.page.scss'],
    providers: [DatePipe]
})
export class CollectionPage implements OnInit, AfterViewInit {

    total = 0;
    operationStatus = '';
    public collections: any[];
    account: User = null;
    currentDate: string;
    qrcodeDataObj: any;
    partenaireConf: PartnerConfigDTO = null;

    constructor(private scanner: BarcodeScanner,
                private collectionService: CollectionService,
                private storage: Storage,
                private accountService: AccountService,
                public alertController: AlertController,
                private router: Router,
                private datePipe: DatePipe,
                private platform: Platform,
                private utilsService: UtilsService,
                private loadingController: LoadingController,
                private jetonService: JetonService,
                private updateService:UpdateService) {
    }

    ngOnInit() {        
        this.collectionService.calculateSum();
        this.updateService.checkForUpdate();
        this.accountService.accountObservable.subscribe(data => {
            this.account = data;
        });

        this.jetonService.partnerConfigDTOObservable.subscribe((data) => {            
            this.partenaireConf = data;
          });

        this.collectionService.totalCollection.subscribe(data => {         
            this.total = data;
        });
    }

    doRefresh(event) {
        console.log('Begin async operation');
    
        setTimeout(() => {
          console.log('Async operation has ended');
          this.collectionService.calculateSum();
          event.target.complete();
        }, 2000);
      }

    ngAfterViewInit() {
    }

    scan() {
        const options = {
            prompt: 'Scanner pour encaisser!',
            resultDisplayDuration: 0
        };
        this.scanner.scan(options).then(qrcodeData => {
            this.qrcodeDataObj = JSON.parse(qrcodeData.text);
            if (this.qrcodeDataObj.accepted) {
                // Redirect to amount form
                const navigationExtras: NavigationExtras = {
                    state: {
                        qrcodeDataObj: this.qrcodeDataObj,
                    }
                };
                this.router.navigate(['/save-payment'], navigationExtras)
                //this.registerCollection(qrcodeDataObj);
            } else {
                this.utilsService.presentAlert('Opération rejeté. Ticket invalide');
            }
        }).catch(() => {
            this.utilsService.presentAlert('Echec du Scannage, veuillez réessayer à nouveau.');
        });
    }

    /*private registerCollection(QrValues: any) {
        this.currentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
        this.loadingController.create({
            cssClass: 'my-loading-class'
        }).then(loading => {
            loading.present().then();
            const {trade, collectionModel} = this.createCollectionModel(QrValues);
            this.collectionService.postCollectionToBacKend(collectionModel).subscribe(() => {
                loading.dismiss().then();
                trade.name = this.account.partner;
                this.collectionService.addCollectionToList(collectionModel);
                this.utilsService.presentAlert('Opération validée');
            }, error => {
                loading.dismiss().then();
                const message = 'Echec de l\'opération';
                this.utilsService.errorStatusFromBackend(error, message);
            });
        });
    }*/

    /*private createCollectionModel(QrValues: any) {
        const business = new PartnerModel(QrValues.idPartenaire, QrValues.partenaire, null);

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
            this.account.firstName + ' ' + this.account.lastName
        );
        return {trade, collectionModel};
    }*/


    ionViewDidEnter() {
        this.utilsService.closeApp();
    }

    ionViewWillLeave() {
        this.utilsService.unSubscribeToExitButton();
    }
}
