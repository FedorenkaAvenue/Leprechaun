import { Module } from '@nestjs/common';

import AdminService from '@services/Admin';
import AdminPrivateController from '@controllers/Admin/private';
import CacheModule from './Cache';

@Module({
    imports: [CacheModule],
    controllers: [AdminPrivateController],
    providers: [AdminService],
})
export default class AdminModule {}
