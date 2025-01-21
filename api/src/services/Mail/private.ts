import { Injectable } from '@nestjs/common';

import renderTemplate from '@utils/renderTemplate';
import { DevLogMailI } from '@interfaces/Mail';
import MailService from '.';
import { singleConfigService } from '@services/Config';

@Injectable()
export default class MailPrivateService extends MailService {
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
            to: singleConfigService.getDevMailReciever(),
            subject: 'Development mail',
            html: content,
        });
    }
}
