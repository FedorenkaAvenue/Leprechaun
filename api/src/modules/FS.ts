import { Module } from '@nestjs/common';

import { FSService } from '@services/FS';

@Module({
    providers: [FSService],
    exports: [FSService],
})
export default class FSModule {}
