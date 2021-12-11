import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LabelAdminController } from '@controllers/Label';
import { LabelEntity } from '@entities/Label';
import { LabelService } from '@services/Label';

@Module({
	imports: [ TypeOrmModule.forFeature([LabelEntity]) ],
	controllers: [ LabelAdminController ],
	providers: [ LabelService ],
})
export class LabelModule {}
