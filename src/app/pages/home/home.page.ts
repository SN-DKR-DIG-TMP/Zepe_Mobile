import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic';
import {AccountService} from '../../services/account/account.service';
import {NotificationsService} from '../../services/notifications/notifications.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {UtilsService} from '../../services/utils.service';
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    providers: [DatePipe]
})
export class HomePage implements OnInit, AfterViewInit {
    firebaseOk: boolean;

    constructor(private router: Router,
                private accountService: AccountService,
                private loadingController: LoadingController,
                private alertController: AlertController,
                private utilsService: UtilsService,
                private notificationService: NotificationsService,
                public datePipe: DatePipe) {
        this.firebaseOk = false;
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.getFirebaseToken();
    }

    getFirebaseToken(): void {
        this.loadingController.create({
            cssClass: 'my-loading-class',
            message: 'Chargement...'
        }).then(loading => {
            loading.present().then();
            FCM.getToken().then((currentToken) => {
                loading.dismiss().then();
                if (currentToken) {
                    this.firebaseOk = true;
                    this.accountService.setFirebaseToken(currentToken);
                }
            }).catch((err) => {
                const message = 'Echec du chargement';
                this.utilsService.errorStatusFromBackend(err, message);
                loading.dismiss().then();
            });

            FCM.onNotification().subscribe(data => {              
                const date = this.datePipe.transform(new Date(data.date),'yyyy-MM-dd\'T\'HH:mm:ss');
                this.notificationService.newNotification(data,date);
            });
        });
    }

    goToLogin() {
        this.router.navigate(['/login'], {replaceUrl: true}).then();
    }


    ionViewDidEnter() {
        this.utilsService.closeApp();
    }

    ionViewWillLeave() {
        this.utilsService.unSubscribeToExitButton();
    }
}
