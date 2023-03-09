import {PartnerModel} from './partner.model';

export class Payment {
    constructor(
        public account: any,
        public business: PartnerModel,
        public trade: PartnerModel,
        public date: Date,
        ) {
    }
}
