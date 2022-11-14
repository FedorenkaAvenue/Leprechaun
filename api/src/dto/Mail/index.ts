import { DevLogMailI } from '@interfaces/Mail';

export class DevLogMailDTO implements DevLogMailI {
    method: string;
    message: string;
    url: string;
    body?: string | null;
    cookies?: string | null;
    stack: string;
    ip: string;
    timestamp: string;
}
