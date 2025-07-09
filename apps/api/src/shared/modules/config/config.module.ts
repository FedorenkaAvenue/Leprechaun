import { Global, Module } from "@nestjs/common";
import {
    ConfigModule as SharedConfigModule,
    ConfigService as SharedConfigService,
} from '@fedorenkaavenue/leprechaun_lib_utils/modules';

import ConfigService from "./config.service";

@Global()
@Module({
    imports: [SharedConfigModule],
    providers: [
        ConfigService,
        {
            provide: SharedConfigService,
            useClass: ConfigService,
        }],
    exports: [ConfigService],
})
export default class ConfigModule { }
