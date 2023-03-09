import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import { environment } from 'src/environments/environment';
import {Payment} from "../../models/payment.model";
import {PaymentTokenDTO} from "../../models/PaymentTokenDTO.model";
import { JetonService } from '../jeton/jeton.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private _history = new BehaviorSubject<Payment[]>([]);
  private _paymentTokenDTO = new BehaviorSubject<PaymentTokenDTO>(null);

  constructor(
    private http: HttpClient
  ) { }

  get history (){
    return this._history.getValue();
  }

  getHistoryObservable (){
    return this._history.asObservable();
  }

  get paymentTokenDTO (){
    return this._paymentTokenDTO.getValue();
  }

  setPaymentTokenDTO (paymentTokenDTO: PaymentTokenDTO){
    this._paymentTokenDTO.next(paymentTokenDTO);
  }

  setPaymentToken(token: string){
    let payment = this.paymentTokenDTO;
    payment.token = token;
    this.setPaymentTokenDTO(payment);
  }

  setHistory (history: Payment[]){
    this._history.next(history);
  }

  addPayment(payment: Payment,paymentToken: string){
  let history = this._history.getValue();
  history.unshift(payment);
  this.setHistory(history);
  this.setPaymentToken(paymentToken);
  }

  getAmountByUserAndTwoDate(end: any, uid: string, start: any) {
    return this.http.get<any[]>(environment.SERVER_API_URL + '/cashment/getCashmentByCustomerAndTwoDate', {params: {end, uid, start}});
  }

  getAmountByUser(uid: string) {
    return this.http.get<any[]>(`${environment.SERVER_API_URL}/cashment/getCashmentByCustomer/` + uid);
  }

  getCashmentByCashierAndDate(uid: string, date: any) {
    return this.http.get<any[]>(`${environment.SERVER_API_URL}/cashment/getCashmentByCashierAndDate/` + uid + '/' + date);
  }

  unValidCashment(cashment: any){
    return this.http.post(`${environment.SERVER_API_URL}/cashment/unvalid`, cashment);
  }

}
