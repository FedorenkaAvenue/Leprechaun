import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Injectable } from '@nestjs/common';

import configService from '../Config';
import renderTemplate from '@utils/renderTemplate';
import { DevLogMailI } from '@interfaces/Mail';

type IMailOptions = Mail.Options & {
    to: string | Array<string>;
};

/**
 * @description e-mail service
 */
@Injectable()
class MailService {
    /**
     * @description create connection
     */
    createConnection(): Transporter<SentMessageInfo> {
        return createTransport(configService.getMailConfig());
    }

    /**
     * @description send e-mail
     * @param $1 mail options
     */
    async sendMail({ to, subject, html, text }: IMailOptions): Promise<void> {
        if (Array.isArray(to)) to = to.join(', '); // mass recieving

        try {
            await this.createConnection().sendMail({
                from: configService.getMailCredentials(),
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
    async sendErrorLogMail(logData: DevLogMailI): Promise<void> {
        await this.sendDevMail(renderTemplate('devMailErrorLog', logData));
    }

    /**
     * @description send mail to dev account
     */
    async sendDevMail(content: string): Promise<void> {
        await this.sendMail({
            to: configService.getDevMailReciever(),
            subject: 'Development mail',
            html: content,
        });
    }
}

const singleMailSerbice = new MailService();

export default singleMailSerbice;
