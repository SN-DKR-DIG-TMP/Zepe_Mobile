export class CollectionModel {
    private userMatricule: string;
    private validate: boolean;
    private value: number;
    constructor(matricule: string, validate: boolean, value: number) {
        this.userMatricule = matricule;
        this.validate = validate;
        this.value = value;
    }
}
