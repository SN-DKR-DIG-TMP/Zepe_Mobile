import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotPwdForm: FormGroup;
  username='';  

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private authenticationService: AuthenticationService,
    private router: Router,
    private utilsService: UtilsService,
    private accountService: AccountService,

  ) { }

  ngOnInit() {
    this.forgotPwdForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPwdForm.controls;
  }

  ionViewDidEnter() {
    this.utilsService.closeApp();
  }

  ionViewWillLeave() {
    this.utilsService.unSubscribeToExitButton();
  }
  
  private getRedirected(): void {
    /*this.userService.getUserByUid(this.forgotPwdForm.value.userId).subscribe(value =>{
    })*/
    const navigationExtras: NavigationExtras = {
        state: {
           user: this.forgotPwdForm.value['username']
        }
    };
    this.router.navigate(['mail-check'], navigationExtras); 
}

  sendRequest() {
    console.log(this.forgotPwdForm.value.username);
    this.getRedirected();
  }

}
