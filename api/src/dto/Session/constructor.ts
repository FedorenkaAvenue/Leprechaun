import { SessionI } from '@interfaces/Session';
import { UserSessionDTO } from '.';

export class UserSession extends UserSessionDTO {
    constructor({ history, ip, url }: SessionI) {
        super();
        this.ip = ip;
        this.url = url;
        this.history = history || [];
    }
}
