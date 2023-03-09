import {User} from "./user";
import {JetonConfigDTO} from "./jetonConfigDTO.model";
import {PaymentTokenDTO} from "./PaymentTokenDTO.model";

export class QRFullValue {
    constructor(public matricule: string,
                public idPartenaire: number,
                public partenaire: string,
                public firebaseToken: string,
                public value: number,
                public totalAmount: number,
                public totalConso: number,
                public amountExceedAutorised: number,
                public token: string,
                public accepted: boolean,
                public customerFullName: string) {
    }
}
