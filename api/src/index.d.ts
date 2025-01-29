import { SessionDataI } from '@interfaces/Session';
import { JWTPayloadI } from '@interfaces/JWT';

declare module 'express-session' {
    interface SessionData extends SessionDataI { }
}

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayloadI
        }
    }
}
