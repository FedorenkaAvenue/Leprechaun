import { Module } from '@nestjs/common';

import ToolsController from './tools.controller';
import ToolsService from './tools.service';
import CacheCoreModule from '@core/cache/cache.module';
import AuthModule from '@core/auth/auth.module';

@Module({
    imports: [CacheCoreModule, AuthModule],
    controllers: [ToolsController],
    providers: [ToolsService],
})
export default class ToolsModule { }
