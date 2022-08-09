import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Injectable } from '@nestjs/common';

import ConfigService from './Config';
import renderTemplate from '@utils/renderTemplate';
import { IDevLogMail } from '@interfaces/Mail';

type IMailOptions = Mail.Options & {
    to: string | Array<string>;
};

/**
 * @description e-mail service
 */
@Injectable()
export default class MailService {
    constructor(private readonly configService: ConfigService) {}
    /**
     * @description create connection
     */
    createConnection(): Transporter<SentMessageInfo> {
        return createTransport(this.configService.getMailConfig());
    }

    /**
     * @description send e-mail
     * @param $1 mail options
     */
    async sendMail({ to, subject, html, text }: IMailOptions): Promise<void> {
        if (Array.isArray(to)) to = to.join(', '); // mass recieving

        try {
            await this.createConnection().sendMail({
                from: this.configService.getMailCredentials(),
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
    async sendErrorLogMail(logData: IDevLogMail): Promise<void> {
        await this.sendDevMail(renderTemplate('devMailErrorLog', logData));
    }

    /**
     * @description send mail to dev account
     */
    async sendDevMail(content: string): Promise<void> {
        await this.sendMail({
            to: this.configService.getDevMailReciever(),
            subject: 'Development mail',
            html: content,
        });
    }
}

//TODO: убрать дефолтный экспорт
export const singleMailSerbice = new MailService(new ConfigService());
