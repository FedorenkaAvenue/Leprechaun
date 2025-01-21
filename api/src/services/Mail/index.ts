import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { singleConfigService } from '@services/Config';

/**
 * @description e-mail service
 */
export default class MailService {
    private readonly mailConfig: SMTPTransport.Options;
    private readonly mailSenderCredential: string;

    constructor() {
        this.mailConfig = singleConfigService.getMailConfig();
        this.mailSenderCredential = singleConfigService.getMailCredentials();
    }

    private createConnection(): Transporter<SentMessageInfo> {
        return createTransport(this.mailConfig);
    }

    /**
     * @description send e-mail
     * @param $1 mail options
     */
    protected async sendMail({ to, subject, html, text }: Mail.Options): Promise<void> {
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
}
