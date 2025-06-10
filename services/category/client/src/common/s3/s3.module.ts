import { Module } from "@nestjs/common";

import FSService from "./s3.service";
import ConfigModule from "@common/config/config.module";

@Module({
    imports: [ConfigModule],
    providers: [FSService],
    exports: [FSService],
})
export default class S3Module { }
