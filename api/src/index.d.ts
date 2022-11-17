import { SessionI } from '@interfaces/Session';

declare module 'express-session' {
    interface SessionData extends SessionI {}
}
