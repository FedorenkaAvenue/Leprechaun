import { Request } from 'express';

import { DevLogMailI } from './mail.interface';

export class DevLogMail implements DevLogMailI {
    method: string;
    message: string;
    url: string;
    body?: string | null;
    cookies?: Request['cookies'];
    stack: string | undefined;
    ip: string | undefined;
    timestamp: string;

    constructor({ method, message, url, body, cookies, stack, ip, timestamp }: DevLogMailI) {
        if (body && Object.keys(body).length) this.body = JSON.stringify(body);
        if (cookies && Object.keys(cookies).length) this.cookies = cookies;

        this.method = method;
        this.message = message;
        this.url = url;
        this.stack = stack;
        this.ip = ip;
        this.timestamp = timestamp;
    }
}
