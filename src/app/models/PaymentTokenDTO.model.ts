export class PaymentTokenDTO {
    constructor(
        public userMatricule: string,
        public token: string,
        public status: string) {
    }
}
