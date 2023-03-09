import { Component, OnInit } from '@angular/core';
import {JetonService} from "../../services/jeton/jeton.service";
import {AccountService} from "../../services/account/account.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private jetonService: JetonService,
              private accountService: AccountService) { }
  login = '';


  ngOnInit() {
    this.login = this.accountService.account.username;
  }

}
