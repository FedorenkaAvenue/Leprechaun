import { SessionI } from '@interfaces/Session';
import { UserSessionDTO } from '.';

export class UserSession extends UserSessionDTO {
    constructor({ history }: SessionI) {
        super();
        this.history = history || [];
    }
}
