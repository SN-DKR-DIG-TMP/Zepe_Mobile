import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../models/user';
import {environment as env, environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _account = new BehaviorSubject<User>(new User('', 32, 'ibou@atos.net', 'ADe65efds6', 'John', 'Doe', null, 'FDSFDFsdfs5', 35, 'Atos'));
  private _firebaseToken = new BehaviorSubject<string>('');
  constructor(
      private http: HttpClient
  ) { }

  get firebaseToken(){
    return this._firebaseToken.getValue();
  }

  setFirebaseToken(firebaseToken: string){
    this._firebaseToken.next(firebaseToken);
  }

  get account(){
    return this._account.getValue();
  }

  get accountObservable(): Observable<User >{
    return this._account.asObservable();
  }

  setAccount(user: User) {
    this._account.next(user);
  }

  changePwd(oldPwd: string, newPwd: string){
    const userId = '' + this.account.username;
    return this.http.put(env.SERVER_API_URL + '/users/updatepwd', {newPwd, oldPwd, userId});
  }

  getUserByUid(uid: string) {
    return this.http.get<any[]>(`${env.SERVER_API_URL}/auth/search/` + uid);
  }

  savingRequest(uid: string) {
    return this.http.post(`${environment.SERVER_API_URL}/auth/saverequest/${uid}`, null);
  }

  getPartenariatParEntreprise(id_entreprise: number){
    return this.http.get<any>(`${env.SERVER_API_URL}/partenariat/getOne/` + id_entreprise)
  }
  getConfigPerPartner(id_entreprise: number){
    return this.http.get<any>(`${env.SERVER_API_URL}/configuration/configperpartner/` + id_entreprise)
  }

  getVersion() {
    return this.http.get<any[]>(`${env.SERVER_API_URL}/users/getVersion`);
  }
  
}
