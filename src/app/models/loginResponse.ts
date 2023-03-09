import {User} from './user';
import {Payment} from "./payment.model";
import {PaymentTokenDTO} from "./PaymentTokenDTO.model";
import {JetonConfigDTO} from "./jetonConfigDTO.model";
import {PartnerConfigDTO} from "./partnerConfigDTO.model";

export class LoginResponse {
    constructor(public account: User,
                public encaissementDTOList: any[],
                public paymentDTOList: Payment[],
                public paymentTokenDto: PaymentTokenDTO,
                public configPartenaireDto: PartnerConfigDTO) {
    }
}
