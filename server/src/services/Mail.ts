import { Injectable } from '@nestjs/common';
import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import ConfigService from './Config';

type IMailOptions = Mail.Options & {
    to: string | Array<string>
}

@Injectable()
export default class MailService {
    /**
     * @description create connection
     */
    createConnection(): Transporter<SentMessageInfo> {
        return createTransport(new ConfigService().getMailConfig());
    }

    /**
     * @description send e-mail
     * @param $1 mail options
     */
    sendMail({ to, subject, html, text }: IMailOptions): void {
        if (Array.isArray(to)) to = to.join(', '); // mass recieving
    
        this.createConnection().sendMail({
            from: new ConfigService().getMailCredentials(),
            to, subject, text, html
        });
    }

    /**
     * @description send mail to dev account
     */
    sendDevMail(context: string): void {
        this.sendMail({
            to: new ConfigService().getDevMailReciever(),
            subject: 'Some logs',
            html: context
        });
    }
}
