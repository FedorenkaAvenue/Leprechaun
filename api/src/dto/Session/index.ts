import { ISession } from '@interfaces/Session';

export class UserSessionSessionDTO implements ISession {
    history: string[];
}
