import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';

import MailService from '.';

@Injectable()
export default class MailPublicService extends MailService {
    public async sendMail(options: Pick<Mail.Options, 'to' | 'subject' | 'html' | 'text'>): Promise<void> {
        await super.sendMail(options);
    }
}
