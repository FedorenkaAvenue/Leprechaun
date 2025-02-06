import { SessionDataI } from '@core/session/session.interface';
import { JWTPayloadI, JWTSuccessTokensI } from '@core/auth/auth.interface';

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
