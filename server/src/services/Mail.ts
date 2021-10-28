import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import ConfigService from './Config';
import TemplateService from './Template';
import { IDevLogMail } from '@interfaces/Mail';

type IMailOptions = Mail.Options & {
    to: string | Array<string>
}

/**
 * @description e-mail service
 */
class MailService {
    /**
     * @description create connection
     */
    createConnection(): Transporter<SentMessageInfo> {
        return createTransport(ConfigService.getMailConfig());
    }

    /**
     * @description send e-mail
     * @param $1 mail options
     */
    async sendMail({ to, subject, html, text }: IMailOptions): Promise<void> {
        if (Array.isArray(to)) to = to.join(', '); // mass recieving
    
        try {
            await this.createConnection().sendMail({
                from: ConfigService.getMailCredentials(),
                to, subject, text, html
            });
        } catch(err) {
            console.error(err);
        }
    }

    /**
     * @description create and mail body content and send to developer
     */
    async sendErrorLogMail(logData: IDevLogMail): Promise<void> {
        await this.sendDevMail(
            TemplateService.renderTemplate(
                'devMailErrorLog',
                logData
            )
        );
    }

    /**
     * @description send mail to dev account
     */
    async sendDevMail(content: string): Promise<void> {
        await this.sendMail({
            to: ConfigService.getDevMailReciever(),
            subject: 'Development mail',
            html: content
        });
    }
}

export default new MailService();
