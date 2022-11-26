import { SessionI } from './Session';

export interface UserPublicI {
    session: SessionI['sid'];
}
