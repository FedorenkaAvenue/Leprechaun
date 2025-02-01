import { Module } from '@nestjs/common';

import AdminPrivateController from '@controllers/Admin/private';
import CacheModule from './Cache';
import AdminPrivateService from '@services/Admin/private';

@Module({
    imports: [CacheModule],
    controllers: [AdminPrivateController],
    providers: [AdminPrivateService],
})
export default class AdminModule { }
