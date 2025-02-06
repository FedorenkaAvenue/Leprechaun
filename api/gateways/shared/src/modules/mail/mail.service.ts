import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Inject, Injectable } from '@nestjs/common';

import { DevLogMailI, MailConfigI } from './mail.interface';
import renderTemplate from '../../utils/renderTemplate';

/**
 * @description e-mail service
 */
@Injectable()
export default class MailService {
    constructor(@Inject('MAIL_CONFIG') private readonly config: MailConfigI) { }

    private createConnection(): Transporter<SentMessageInfo> {
        return createTransport(this.config.getMailConfig());
    }

    /**
     * @description send e-mail
     * @param $1 mail options
     */
    public async sendMail({ to, subject, html, text }: Mail.Options): Promise<void> {
        if (Array.isArray(to)) to = to.join(', '); // mass recieving

        try {
            await this.createConnection().sendMail({
                from: this.config.getMailCredentials(),
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
        await this.sendDevMail(renderTemplate('private/devMailErrorLog', logData));
    }

    /**
     * @description send mail to developer/admin account
     */
    private async sendDevMail(content: string): Promise<void> {
        await this.sendMail({
            to: this.config.getDevMailReciever(),
            subject: 'Development mail',
            html: content,
        });
    }
}
