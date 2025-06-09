import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PropertyGroupEntity } from "./propertyGroup.entity";
import PropertyModule from "../property/property.module";
import PropertyGroupService from "./propertyGroup.service";
import PropertyGroupController from "./propertyGroup.controller";
import TransModule from "@common/trans/trans.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([PropertyGroupEntity]),
        PropertyModule,
        TransModule,
    ],
    controllers: [PropertyGroupController],
    providers: [PropertyGroupService],
})
export default class PropertyGroupModule { }
