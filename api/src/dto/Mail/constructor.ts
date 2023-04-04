import { DevLogMailI } from '@interfaces/Mail';

export class DevLogMail implements DevLogMailI {
    method: string;
    message: string;
    url: string;
    body?: string | null;
    cookies?: string | null;
    stack: string;
    ip: string;
    timestamp: string;

    constructor({ method, message, url, body, cookies, stack, ip, timestamp }: DevLogMailI) {
        if (Object.keys(body).length) this.body = JSON.stringify(body);
        if (Object.keys(cookies).length) this.cookies = JSON.stringify(cookies);

        this.method = method;
        this.message = message;
        this.url = url;
        this.stack = stack;
        this.ip = ip;
        this.timestamp = timestamp;
    }
}
