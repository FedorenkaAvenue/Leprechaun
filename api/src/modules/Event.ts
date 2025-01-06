import { Module } from '@nestjs/common';
import { EventPrivateService } from '@services/Event/private';

import { EventPublicService } from '@services/Event/public';

@Module({
    providers: [EventPublicService, EventPrivateService],
    exports: [EventPublicService],
})
export default class EventModule { }
