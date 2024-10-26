import { Request } from 'express';

export interface DevLogMailI {
    method: string;
    message: string;
    url: string;
    body?: string | null;
    cookies?: Request['cookies']
    stack: string;
    ip: string;
    timestamp: string;
}
