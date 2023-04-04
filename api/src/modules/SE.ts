import { Module, OnModuleInit } from "@nestjs/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import ConfigService from "@services/Config";

import { SEService } from "@services/SE";

@Module({
    imports: [ElasticsearchModule.registerAsync({
        inject: [ConfigService],
        useFactory: (conf: ConfigService) => conf.getSEConnectionData(),
    })],
    providers: [SEService],
    exports: [SEService, ElasticsearchModule],
})
export default class SEModule implements OnModuleInit {
    constructor(private readonly service: SEService) { }

    public async onModuleInit(): Promise<void> {
        this.service.initSE();
    }
}
