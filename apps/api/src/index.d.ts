import { SessionDataI } from '@core/session/session.interface';
import { JWTPayloadI, JWTSuccessTokensI } from '@core/auth/auth.interface';

declare global {
    namespace Express {
        interface Request {
            user: JWTPayloadI
            session: string
        }
    }
}
