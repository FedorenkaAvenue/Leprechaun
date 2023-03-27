import { Module, OnModuleInit } from "@nestjs/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch";

import configService from "@services/Config";
import { SEService } from "@services/SE";

@Module({
    imports: [ElasticsearchModule.registerAsync({
        useFactory: () => configService.getSEConnectionData()
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
