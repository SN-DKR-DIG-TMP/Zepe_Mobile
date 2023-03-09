import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInput, ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AccountService} from '../../services/account/account.service';
import {UtilsService} from '../../services/utils.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {

  constructor(private modalController: ModalController,
              private accountServ: AccountService,
              private router: Router,
              private utilsServ: UtilsService,
              private formBuilder: FormBuilder) {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.pattern('^[A-Za-z-0-9-]{8,20}')],
      oldPassword: ['', Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$')],
      newPassword: ['', Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$')],
      confirmPassword: ['', Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$')]
    });
  }

  namePasswordIcon = 'eye-outline';
  nameNewPasswordIcon = 'eye-outline';
  nameRepeatPasswordIcon = 'eye-outline';
  show = false;
  passwordForm: FormGroup;
  password = '';
  confirmPassword = '';
  @ViewChild('passwordInput') passwordInput: IonInput;
  @ViewChild('passwordNInput') passwordNInput: IonInput;
  @ViewChild('passwordCInput') passwordCInput: IonInput;

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.utilsServ.presentAlert('Mot de passe changé avec succés').then(r => console.log(r));


    const oldPassword = form.value.oldPassword;
    const newPassword = form.value.newPassword;
    const confirmPassword = form.value.confirmPassword;
    if (confirmPassword === newPassword) {
      this.accountServ.changePwd(oldPassword, newPassword).subscribe(data => {
        this.utilsServ.presentAlert('Mot de passe changé avec succés').then(r => console.log(r));
        console.log('this.router.url', this.router.url);
        if (this.router.url === '/login') {        }
      }, error => {
        this.utilsServ.presentAlert('Erreur veuillez réessayer');
      });
    } else {
      this.utilsServ.presentAlert('Codes non identiques');
    }

    // this.Service.changePassword(oldPassword,newPassword).subscribe(data => {
    // this.showAlert(data.error);
    // })
  }

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  showPassword(type: string) {
    this.show = !this.show;
    if (this.show) {
      if (type === 'oldPassword') {
        this.namePasswordIcon = 'eye-off-outline';
        this.passwordInput.type = 'text';
      }
      if (type === 'newPassword') {
        this.nameNewPasswordIcon = 'eye-off-outline';
        this.passwordNInput.type = 'text';
      }
      if (type === 'repeatPassword') {
        this.nameRepeatPasswordIcon = 'eye-off-outline';
        this.passwordCInput.type = 'text';
      }

    } else {
      if (type === 'oldPassword') {
        this.namePasswordIcon = 'eye-outline';
        this.passwordInput.type = 'password';
      }
      if (type === 'newPassword') {
        this.nameNewPasswordIcon = 'eye-outline';
        this.passwordNInput.type = 'password';
      }
      if (type === 'repeatPassword') {
        this.nameRepeatPasswordIcon = 'eye-outline';
        this.passwordCInput.type = 'password';
      }
    }
  }
}
