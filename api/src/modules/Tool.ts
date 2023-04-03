import { Global, Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";

import ConfigService from "@services/Config";
import { FSService } from "@services/FS";
import LoggerService from "@services/Logger";
import MailService from "@services/Mail";

@Global()
@Module({
    imports: [MulterModule.registerAsync({ useClass: FSService })],
    providers: [ConfigService, FSService, MailService, LoggerService],
    exports: [ConfigService, FSService, MailService, LoggerService],
})
export default class ToolModule {}
