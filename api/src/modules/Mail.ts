import { Module } from "@nestjs/common";

import MailPrivateService from "@services/Mail/private";
import MailPublicService from "@services/Mail/public";

@Module({
    providers: [MailPublicService, MailPrivateService],
    exports: [MailPublicService, MailPrivateService],
})
export default class MailModule { }
