import { SessionDataI } from '@interfaces/Session';

declare module 'express-session' {
    interface SessionData extends SessionDataI {}
}
