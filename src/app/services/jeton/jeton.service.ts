import { Injectable } from '@angular/core';
import {JetonConfigDTO} from "../../models/jetonConfigDTO.model";
import {BehaviorSubject} from "rxjs";
import {PartnerConfigDTO} from "../../models/partnerConfigDTO.model";
import {PaymentService} from "../payment/payment.service";

@Injectable({
  providedIn: 'root'
})
export class JetonService {
  private _jetonConfig = new BehaviorSubject<JetonConfigDTO>(new JetonConfigDTO(1000,1000));
  private _partnerConfigDTO = new BehaviorSubject<PartnerConfigDTO> (null);
  constructor(
      private paymentService: PaymentService ) { }

  get jetonConfig (){
    return this._jetonConfig.getValue();
  }

  get partnerConfigDTO (){
    return this._partnerConfigDTO.getValue();
  }

  get jetonConfigObservable (){
    return this._jetonConfig.asObservable();
  }

  get partnerConfigDTOObservable (){
    return this._partnerConfigDTO.asObservable();
  }

  setJetonConfig (jetonConfig: JetonConfigDTO){
    this._jetonConfig.next(jetonConfig);
  }

  setPartnerConfigDTO (partnerConfig: PartnerConfigDTO){
     this._partnerConfigDTO.next(partnerConfig);
  }

  validation (){
    if (this.paymentService.history.length >= this.partnerConfigDTO.configs[0].intValue) {
      return false;
    }else {
      return true;
    }
  }

}
