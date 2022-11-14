import { DevLogMailI } from '@interfaces/Mail';
import { DevLogMailDTO } from '.';

export class DevLogMail extends DevLogMailDTO {
    constructor({ method, message, url, body, cookies, stack, ip, timestamp }: DevLogMailI) {
        super();
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
