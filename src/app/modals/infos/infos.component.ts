import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AccountService} from '../../services/account/account.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss'],
})
export class InfosComponent implements OnInit {

  modification = false;
  user: User = null;
  constructor(private modalController: ModalController,
              private accountService: AccountService) { }

  ngOnInit() {

    this.accountService.accountObservable.subscribe(data => {
      this.user = data;
    });
  }

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  change() {
    this.modification = true;
  }

  reset() {
    this.modification = false;

  }
}
