import { UserSchema } from '@schemas/User';

type Model = UserSchema;

export default async function getUser(): Promise<Model> {
    const res = await fetch('http://api.leprechaun.loc/user');

    return res.json();
}
