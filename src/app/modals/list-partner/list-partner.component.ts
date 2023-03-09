import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account/account.service';
import { CommonModule } from "@angular/common";
import { LaunchNavigator, LaunchNavigatorOptions } from "@ionic-native/launch-navigator/ngx";

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
      private accountService: AccountService,
      private launchNavigator: LaunchNavigator,
  ) { }

  ngOnInit() {
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

  options: LaunchNavigatorOptions = {
    //start: 'London, ON',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  }
  
  onClick(name, addr){
    this.launchNavigator.navigate(name+','+addr, this.options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
    
  }
  ionViewWillEnter() {
   
  }

  onCancel() {
    this.modalController.dismiss(null, "cancel");
  }
}
