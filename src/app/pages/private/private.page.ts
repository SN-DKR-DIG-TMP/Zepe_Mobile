import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {HistoryComponent} from '../../modals/history/history.component';
import {PasswordComponent} from '../../modals/password/password.component';
import {InfosComponent} from '../../modals/infos/infos.component';
import {AccountService} from '../../services/account/account.service';
import {User} from '../../models/user';
import { ListPartnerComponent } from 'src/app/modals/list-partner/list-partner.component';

@Component({
    selector: 'app-private',
    templateUrl: './private.page.html',
    styleUrls: ['./private.page.scss'],
})
export class PrivatePage implements OnInit {

    account: User = null;
    
    constructor(private modalController: ModalController,
                private accountService: AccountService,
                private router: Router) {
    }

    ngOnInit() {
        this.accountService.accountObservable.subscribe(data => {
            this.account = data;
            //console.log(data);
        });
    }

    onPasswordChange() {
        this.modalController.create({component: PasswordComponent})
            .then(modalEl => {
                modalEl.present();
            });
    }

    onHistory() {
        if (this.account !== null) {
            if (this.account.zepeRole === 'CAISSIER') {
                this.router.navigate(['/collections-list']).then();
            } else if (this.account.zepeRole === 'CLIENT') {
                this.modalController.create({component: HistoryComponent})
                    .then(modalEl => {
                        modalEl.present();
                    });
            }
        }
    }

    onDisconnect() {
        this.router.navigateByUrl('/login',  { replaceUrl: true });
    }
    onAccueil(){
        if(this.accountService.account.zepeRole == "CLIENT"){
            this.router.navigateByUrl('/pay',  { replaceUrl: true });
        }
        else{
            this.router.navigateByUrl('/cashment',  { replaceUrl: true });
        }
        
    }
    onInfos() {
        this.modalController.create({component: InfosComponent})
            .then(modalEl => {
                modalEl.present();
            });
    }

    onPartner() {
        this.modalController.create({component: ListPartnerComponent})
            .then(modalEl => {
                modalEl.present();
            });
    }
}
