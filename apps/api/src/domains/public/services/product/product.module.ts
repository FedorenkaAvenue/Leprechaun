import { Module } from '@nestjs/common';

import ProductPublicController from './product.controller';
import ProductModule from '@common/product/product.module';
import UserModule from '@common/user/user.module';

@Module({
    imports: [ProductModule, UserModule],
    controllers: [ProductPublicController],
})
export default class ProductPublicModule { }
