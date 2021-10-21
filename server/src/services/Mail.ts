import { Injectable } from '@nestjs/common';
import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import ConfigService from './Config';
import TemplateService from './Template';

type IMailOptions = Mail.Options & {
    to: string | Array<string>
}

interface IDevLogMail {
    method: string
    status: number
    message: string
    path: string
    body?: string
    cookies?: string
    stack: string
    ip: string
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
     * @description create and mail body content and send to developer
     */
    sendErrorLogMail(logData: IDevLogMail): void {
        this.sendDevMail(
            new TemplateService().renderTemplate(
                'devMailErrorLog',
                logData
            )
        );
    }

    /**
     * @description send mail to dev account
     */
    sendDevMail(content: string): void {
        this.sendMail({
            to: new ConfigService().getDevMailReciever(),
            subject: 'Development mail',
            html: content
        });
    }
}
