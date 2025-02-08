import { Module } from "@nestjs/common";

import AuthCoreModule from '@core/auth/auth.module';

@Module({
    imports: [AuthCoreModule],
})
export default class AuthModule { }
