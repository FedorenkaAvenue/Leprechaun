import { Module } from '@nestjs/common';

import UserPublicService from '@services/User/public';
import UserController from '@controllers/User/public';

@Module({
    controllers: [UserController],
    providers: [UserPublicService],
})
export default class UserModule {}
