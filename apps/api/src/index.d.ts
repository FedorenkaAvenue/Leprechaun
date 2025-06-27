import { SessionDataI } from '@core/session/session.interface';

import { JWTPayload } from '@gen/auth';
import { User } from '@gen/user';

declare global {
    namespace Express {
        interface Request {
            userId: User['id']
            userPayload: JWTPayload
        }
    }
}
