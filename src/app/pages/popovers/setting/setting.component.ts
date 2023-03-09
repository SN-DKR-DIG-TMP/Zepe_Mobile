import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  profile() {
    // code for setting wifi option in apps
    this.popoverController.dismiss().then();
  }

  logout() {
    // code for logout
    this.popoverController.dismiss().then();
  }

  collectionsList() {
    this.popoverController.dismiss('collections_list').then();
  }
}
