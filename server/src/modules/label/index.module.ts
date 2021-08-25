import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LabelController } from './index.controller';
import { LabelEntity } from './index.entity';
import { LabelService } from './index.service';

@Module({
	imports: [ TypeOrmModule.forFeature([LabelEntity]) ],
	controllers: [ LabelController ],
	providers: [ LabelService ],
})
export class LabelModule {}
