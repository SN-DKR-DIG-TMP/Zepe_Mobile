import {Injectable} from '@angular/core';
import {AlertController, ModalController, Platform} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private subscription: Subscription;

  constructor(private modalController: ModalController,
              private alertController: AlertController,
              private platform: Platform,
              private router: Router
  ) {
  }

  errorStatusFromBackend(error, message: string) {
    if (error.status === 500 || error.status === 404) {
      this.presentAlert('Une Erreur est survenue pendant l\'opération,\n veuillez réessayer ultérieurement')
        .then();
    } else if (error.status === 400) {
      this.presentAlert(message).then();
    } else {
      this.presentAlert('Echec de l\'opération ').then();
    }
  }

  async presentAlert(messages: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Notification',
      message: messages,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            if (this.router.url === '/login'){
                this.modalController.dismiss(null, 'cancel');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  closeApp() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  unSubscribeToExitButton() {
    this.subscription.unsubscribe();
  }
}
