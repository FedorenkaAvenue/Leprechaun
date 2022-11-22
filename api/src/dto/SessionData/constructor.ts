import { SessionDataI } from '@interfaces/Session';
import SessionDataDTO from '.';

export default class SessionData extends SessionDataDTO {
    constructor({ ip }: SessionDataI) {
        super();
        this.ip = ip;
    }
}
