import { ISession } from '@interfaces/Session';
import { UserSessionSessionDTO } from '.';

export class UserSession extends UserSessionSessionDTO {
    constructor({ history }: ISession) {
        super();
        this.history = history || [];
    }
}
