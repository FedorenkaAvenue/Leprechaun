import { Module } from '@nestjs/common';

import UserService from '@services/User';
import UserController from '@controllers/User';
import ProductModule from './Product';

@Module({
    controllers: [ UserController ],
    providers: [ UserService ],
    imports: [ ProductModule ]
})
export default class UserModule {}
