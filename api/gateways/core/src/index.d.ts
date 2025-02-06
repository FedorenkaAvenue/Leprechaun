import { SessionDataI } from './session/session.interface';
import { JWTPayloadI } from './auth/auth.interface';

declare module 'express-session' {
    interface SessionData extends SessionDataI { }
}

declare global {
    namespace Express {
        interface Request {
            user: JWTPayloadI
        }
    }
}
