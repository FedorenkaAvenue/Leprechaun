import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductLabelController } from './index.controller';
import { LabelEntity } from './index.entity';
import { LabelService } from './index.service';

@Module({
	imports: [ TypeOrmModule.forFeature([LabelEntity]) ],
	controllers: [ ProductLabelController ],
	providers: [ LabelService ],
})
export class LabelModule {}
