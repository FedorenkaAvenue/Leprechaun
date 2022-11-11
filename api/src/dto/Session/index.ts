import { SessionI } from '@interfaces/Session';

export class UserSessionDTO implements SessionI {
    history: string[];
}
