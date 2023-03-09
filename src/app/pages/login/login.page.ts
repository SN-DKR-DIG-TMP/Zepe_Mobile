import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController, IonInput, LoadingController, ModalController, Platform} from '@ionic/angular';
import {AuthenticationService} from '../../services/authentication.service';
import {Storage} from '@ionic/storage';
import {LoginResponse} from '../../models/loginResponse';
import {AccountService} from '../../services/account/account.service';
import {PaymentService} from '../../services/payment/payment.service';
import {JetonService} from '../../services/jeton/jeton.service';
import {CollectionService} from '../../services/collection.service';
import {UtilsService} from '../../services/utils.service';
import {PasswordComponent} from '../../modals/password/password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  username = '';
  password = '';
  name = 'eye-outline';
  show = false;
  @ViewChild('passwordInput') passwordInput: IonInput;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private authenticationService: AuthenticationService,
    private collectionService: CollectionService,
    private loadingController: LoadingController,
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    private utilsService: UtilsService,
    private accountService: AccountService,
    private paymentService: PaymentService,
    private jetonService: JetonService,
    public alertController: AlertController,
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Method to login
   * it calls the authentication service
   * which will make the communication with the server
   */
  async login() {
    this.loadingController.create({
      cssClass: 'my-loading-class'
    }).then(loading => {
      loading.present().then();
      const credentials: any = {
        username: this.f.username.value,
        password: this.f.password.value
      };
      this.authenticationService.login(credentials)
        .subscribe((response) => {
          loading.dismiss().then();
          this.saveAndRedirectionAfterLogin(response);
        }, error => {
          const message = 'Données incorrectes';
          this.utilsService.errorStatusFromBackend(error, message);
          loading.dismiss().then();
        });
    });
  }

  private saveAndRedirectionAfterLogin(response: LoginResponse) {
    if (response.account != null) {
      this.accountService.setAccount(response.account);
      if (response.account.firstConnection === true) {
        this.modalController.create({component: PasswordComponent})
          .then(modalEl => {
            modalEl.present();
          });
      } else if (response.account.firstConnection === false) {
        if (response.account.zepeRole === 'CAISSIER' || response.account.zepeRole === 'ADMIN_COMMERCE'
          || response.account.zepeRole === 'GESTIONNAIRE_COMMERCE') {
          this.collectionService.setCollectionList(response.encaissementDTOList);
          this.router.navigate(['cashment'], {replaceUrl: true});
        } else if (response.account.zepeRole === 'CLIENT' || response.account.zepeRole === 'ADMIN_ENTREPRISE'
          || response.account.zepeRole === 'ADMIN_MEDIATION' || response.account.zepeRole === 'GESTIONNAIRE_ENTREPRISE') {
          this.paymentService.setHistory(response.paymentDTOList);
          this.paymentService.setPaymentTokenDTO(response.paymentTokenDto);
          this.jetonService.setPartnerConfigDTO(response.configPartenaireDto);
          this.router.navigate(['pay']);
        } else {
          this.utilsService.presentAlert('Erreur: Données incorrectes');
        }
      }
    } else {
      this.utilsService.presentAlert('Erreur: Données incorrectes');
    }
  }

  showPassword() {
    this.show = !this.show;
    if (this.show) {
      this.name = 'eye-off-outline';
      this.passwordInput.type = 'text';
    } else {
      this.name = 'eye-outline';
      this.passwordInput.type = 'password';
    }
  }

  ionViewDidEnter() {
    this.utilsService.closeApp();
  }

  ionViewWillLeave() {
    this.utilsService.unSubscribeToExitButton();
  }
}

