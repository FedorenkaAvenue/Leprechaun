import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Injectable } from '@nestjs/common';

import renderTemplate from '@utils/renderTemplate';
import { DevLogMailI } from '@interfaces/Mail';
import ConfigService from './Config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

type IMailOptions = Mail.Options & {
    to: string | Array<string>;
};

/**
 * @description e-mail service
 */
@Injectable()
export default class MailService {
    private readonly mailCredentials: SMTPTransport.Options;
    private readonly mailSenderCredential: string;
    private readonly devMailCredentials: string;

    constructor(private readonly configService: ConfigService) {
        this.mailCredentials = this.configService.getMailConfig();
        this.mailSenderCredential = this.configService.getMailCredentials();
        this.devMailCredentials = this.configService.getDevMailReciever();
    }

    /**
     * @description create connection
     */
    private createConnection(): Transporter<SentMessageInfo> {
        return createTransport(this.mailCredentials);
    }

    /**
     * @description send e-mail
     * @param $1 mail options
     */
    private async sendMail({ to, subject, html, text }: IMailOptions): Promise<void> {
        if (Array.isArray(to)) to = to.join(', '); // mass recieving

        try {
            await this.createConnection().sendMail({
                from: this.mailSenderCredential,
                to,
                subject,
                text,
                html,
            });
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * @description create and mail body content and send to developer
     */
    public async sendErrorLogMail(logData: DevLogMailI): Promise<void> {
        await this.sendDevMail(renderTemplate('devMailErrorLog', logData));
    }

    /**
     * @description send mail to dev account
     */
    private async sendDevMail(content: string): Promise<void> {
        await this.sendMail({
            to: this.devMailCredentials,
            subject: 'Development mail',
            html: content,
        });
    }
}
