import { UserSchema } from '@schemas/User';
import { appRequest } from '..';

type Model = UserSchema;

export default async function getUser(): Promise<Model> {
    return await appRequest<Model>('user');
}
