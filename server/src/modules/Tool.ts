import { Global, Module } from '@nestjs/common';

import { ConfigService } from '@services/Config';
import { MailService } from '@services/Mail';
import { FSService } from '@services/FS';

//TODO: remove global
@Global()
@Module({
    providers: [ ConfigService, MailService, FSService ],
    exports: [ ConfigService, MailService, FSService ]
})
export class ToolModule {}
