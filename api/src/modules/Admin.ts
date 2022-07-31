import { Module } from '@nestjs/common';

import AdminService from '@services/Admin';
import CacheService from '@services/Cache';
import AdminController from '@controllers/Admin/admin';

@Module({
    controllers: [ AdminController ],
    providers: [ AdminService, CacheService ],
    exports: [ CacheService ]
})
export default class AdminModule {}
