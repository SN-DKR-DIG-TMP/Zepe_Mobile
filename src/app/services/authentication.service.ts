import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {map} from 'rxjs/operators';
import {Storage} from '@ionic/storage';

import {environment as env, environment} from 'src/environments/environment';
import {LoginResponse} from '../models/loginResponse';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(
        private http: HttpClient,
        private storage: Storage
    ) {
    }

    /**
     * Method that takes username and password
     * combined in credentials and returns the
     * user's informations as the token etc...
     */
    public login(credentials: Account): Observable<LoginResponse> {
        /** #TODO implémentter la méthode de login */
        return this.http.post<LoginResponse>(env.SERVER_API_URL + '/auth/signin', credentials)
            .pipe(
                map(response => {
                    return response;
                })
            );
    }

    storageRoleAndToken(response: any) {
        this.storage.set('role', response.user.role).then();
    }

}
