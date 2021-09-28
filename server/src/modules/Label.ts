import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LabelController } from '@controllers/Label';
import { LabelEntity } from '@entities/Label';
import { LabelService } from '@services/Label';

@Module({
	imports: [ TypeOrmModule.forFeature([LabelEntity]) ],
	controllers: [ LabelController ],
	providers: [ LabelService ],
})
export class LabelModule {}
