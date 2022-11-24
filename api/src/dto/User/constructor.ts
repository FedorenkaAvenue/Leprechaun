import { UserPublicDTO } from '.';

export class UserPublic extends UserPublicDTO {
    constructor({ session }: UserPublicDTO) {
        super();
        this.session = session;
    }
}
