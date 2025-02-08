import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";

import FSService from "./FS.service";
import ConfigModule from "../config/config.module";
import ConfigService from "../config/config.service";

@Module({
    imports: [
        ConfigModule,
        MulterModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => config.getMulterConfig(),
        }),
    ],
    providers: [FSService],
    exports: [FSService],
})
export default class FSModule { }
