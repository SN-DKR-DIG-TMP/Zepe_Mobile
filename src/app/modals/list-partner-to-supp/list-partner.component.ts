import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-list-partner',
  templateUrl: './list-partner.component.html',
  styleUrls: ['./list-partner.component.scss'],
})
export class ListPartnerComponent implements OnInit {

  account: User = null;
  partners: any[] = null;
  constructor(   
      private modalController: ModalController,
      private accountService: AccountService
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.accountService.accountObservable.subscribe(data => {
      this.account = data;
      console.log(data);
    });

    this.accountService.getPartenariatParEntreprise(this.account.idPartner).subscribe(data => {
      //Partner
      this.partners = data;
      console.log(this.partners);
            
    });
  }

  onCancel() {
    this.modalController.dismiss(null, "cancel");
  }
}
