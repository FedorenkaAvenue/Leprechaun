import { Request } from 'express';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export interface DevLogMailI {
    method: string;
    message: string;
    url: string;
    body?: string | null;
    cookies?: Request['cookies']
    stack: string | undefined;
    ip: string | undefined;
    timestamp: string;
}

export interface MailConfigI {
    getMailConfig(): SMTPTransport.Options;
    getMailCredentials(): string;
    getDevMailReciever(): string;
}
