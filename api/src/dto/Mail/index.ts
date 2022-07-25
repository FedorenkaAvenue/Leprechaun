import { IDevLogMail } from "@interfaces/Mail";

export class DevLogMailDTO implements IDevLogMail {
    method: string;
    message: string;
    url: string;
    body?: string | null;
    cookies?: string | null;
    stack: string;
    ip: string;
    timestamp: string;
}
