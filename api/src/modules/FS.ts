import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { FSService } from '@services/FS';

@Module({
    imports: [MulterModule.registerAsync({ useClass: FSService })],
    providers: [FSService],
    exports: [FSService],
})
export default class FSModule {}
