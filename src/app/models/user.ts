export class User {
    constructor(
        public accessToken: string,
        public id: number,
        public email: string,
        public username: string,
        public firstName: string,
        public lastName: string,
        public roles: string[],
        public zepeRole: string,
        public idPartner: number,
        public partner: string,
        public firstConnection?: boolean,
    ) {}
}
