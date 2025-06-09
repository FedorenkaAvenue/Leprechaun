import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PropertyEntity } from "./property.entity";
import PropertyService from "./property.service";
import PropertyController from "./property.controller";
import TransModule from "@common/trans/trans.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([PropertyEntity]),
        TransModule,
    ],
    controllers: [PropertyController],
    providers: [PropertyService],
})
export default class PropertyModule { }
