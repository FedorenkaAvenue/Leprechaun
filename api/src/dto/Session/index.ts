import { SessionI } from '@interfaces/Session';

export class UserSessionDTO implements SessionI {
    ip: string;
    url: string;
    history: string[];
}
