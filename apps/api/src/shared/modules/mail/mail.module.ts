import { DynamicModule, Global, Module } from "@nestjs/common";

import MailService from "./mail.service";

@Global()
@Module({
    providers: [MailService],
    exports: [MailService],
})
export default class MailModule {
    static forRootAsync(options: any): DynamicModule {
        return {
            module: MailModule,
            imports: options.imports || [],
            providers: [
                {
                    provide: 'MAIL_CONFIG',
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
                MailService,
            ],
            exports: [MailService],
        };
    }
}
