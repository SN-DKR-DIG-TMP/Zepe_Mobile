import {JetonConfigDTO} from "./jetonConfigDTO.model";

export class PartnerConfigDTO {
    constructor(
                public configs: {
                    "key": {
                        key: string,
                        "keyName": string
                    },
                    "intValue": number
                }[],
                public jetonEntreprise: JetonConfigDTO,
                public message: string) {
    }
}
