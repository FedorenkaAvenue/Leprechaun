import { ISession } from '@interfaces/Session';

export class SessionDTO implements ISession {
    history: string[];

    constructor({ history }: ISession) {
        this.history = history || [];
    }
}
