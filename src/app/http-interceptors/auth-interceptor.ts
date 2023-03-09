import {Injectable} from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {AccountService} from '../services/account/account.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {UtilsService} from '../services/utils.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router,
                public alertController: AlertController,
                private accountService: AccountService,
                private utilsService: UtilsService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = this.accountService.account.accessToken;

        if (token) {
            req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
        }

        if (!req.headers.has('Content-Type')) {
            req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
        }

        req = req.clone({headers: req.headers.set('Accept', 'application/json')});

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    if (error.error.success === false) {
                        this.utilsService.presentAlert('Connexion Echouée!!');
                    } else {
                        this.router.navigate(['login']);
                    }
                }
                return throwError(error);
            }));
    }
}
