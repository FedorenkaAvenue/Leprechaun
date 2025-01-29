import { Global, Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";

import ConfigService from "@services/Config";
import CryptoService from "@services/Crypto";
import { FSService } from "@services/FS";
import LoggerService from "@services/Logger";

@Global()
@Module({
    imports: [MulterModule.registerAsync({ useClass: FSService })],
    providers: [ConfigService, FSService, LoggerService, CryptoService],
    exports: [ConfigService, FSService, LoggerService, CryptoService],
})
export default class ToolModule { }
