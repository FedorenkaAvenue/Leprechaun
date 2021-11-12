import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from '@controllers/User';
import { UserEntity } from '@entities/User';
import { UserService } from '@src/services/User';

@Module({
	imports: [ TypeOrmModule.forFeature([ UserEntity ]) ],
	controllers: [ UserController ],
	providers: [ UserService ]
})
export class UserModule {}
