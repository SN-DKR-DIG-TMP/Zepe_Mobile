import {PartnerModel} from './partner.model';
import {PaymentToken} from './paymentToken';
import {PaymentTokenDTO} from "./PaymentTokenDTO.model";

export class CollectionsModel {
    public business?: any;
    public customer: string;
    public cashier: string;
    public trade?: PartnerModel;
    public tokenPayment: PaymentTokenDTO;
    public amount: number;
    public customerTokenFirebase: string;
    public date?: any;
    public customerFullName: string;
    public cashierFullName: String;
    public isValid: boolean;

    constructor(
        business: any,
        customer: string,
        cashier: string,
        trade: PartnerModel,
        tokenPayment: PaymentTokenDTO,
        amount: number,
        customerTokenFirebase: any,
        datebackend: any,
        customerFullName: string,
        cashierFullName: string,
        isValid: boolean
    ) {
        this.business = business;
        this.customer = customer;
        this.cashier = cashier;
        this.trade = trade;
        this.tokenPayment = tokenPayment;
        this.amount = amount;
        this.customerTokenFirebase = customerTokenFirebase;
        this.date = datebackend;
        this.customerFullName = customerFullName;
        this.cashierFullName = cashierFullName;
        this.isValid = isValid;
    }

}
