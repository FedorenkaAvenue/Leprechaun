import { Module } from '@nestjs/common';

import AdminService from '@services/Admin';
import CacheService from '@services/Cache';
import AdminController from '@controllers/Admin';

@Module({
    controllers: [ AdminController ],
    providers: [ AdminService, CacheService ]
})
export default class AdminModule {}
