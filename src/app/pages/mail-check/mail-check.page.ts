import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account/account.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-mail-check',
  templateUrl: './mail-check.page.html',
  styleUrls: ['./mail-check.page.scss'],
})
export class MailCheckPage implements OnInit {

  mailCheckForm: FormGroup;
  submitted = false;
  userId: string;
  currentUrl: boolean;
  titreForm: string;
  errorMessage: any;
  errorCode = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private utilsService: UtilsService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      user: any
    };

    if (state) {
      if (state.user) {
          this.userId = state.user;
      }
    } else {
      history.back();
    }

    router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
            console.log('prev:', event.url);
            this.currentUrl = event.url === '/initialize-password';
        });
    console.log("----------------------");
    console.log(state.user);
    console.log("----------------------");

   }

  // convenience getter for easy access to form fields
  get f() {
    return this.mailCheckForm.controls;
  }

  ngOnInit() {
    this.mailCheckForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  ionViewDidEnter() {
    this.utilsService.closeApp();
  }

  ionViewWillLeave() {
    this.utilsService.unSubscribeToExitButton();
  }
  saveRequest(){
    this.submitted  =true;
    if(this.mailCheckForm.invalid){
      return;
    }
    this.accountService.getUserByUid(this.userId).subscribe(value =>{
      if(this.mailCheckForm.value['email'] == value['email']){
        this.accountService.savingRequest(this.userId).subscribe(value => {
          console.log("Requete enregistre");
          console.log("ok");
      }, error => this.onHttpError(error));
    }
  })
    console.log(this.mailCheckForm.value.email);
    setTimeout(() => {
      this.router.navigate(['home'])
    }, 1000);
    
  }

 private onHttpError(error): void {
    console.log(error);
    /*const errorObject = JSON.parse(error.substring(6));
    console.log(errorObject);
    this.errorMessage = errorObject[0].message;
    this.errorCode = errorObject[0].code;
    if (errorObject[0].message === '') {
        this.errorCode = 'unknown';
        this.errorMessage = 'Echec de l\'opération, veuillez réessayer ultérieurement';
    }
    //this.dismissTimer(this.onError, true);*/
    }
  

}
