import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PropertyGroupEntity } from "./propertyGroup.entity";
import PropertyModule from "../property/property.module";
import PropertyGroupService from "./propertyGroup.service";
import PropertyGroupController from "./propertyGroup.controller";
import TransModule from "@common/trans/trans.module";
import CategoryModule from "@common/category/category.module";
import EventModule from "@common/event/event.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([PropertyGroupEntity]),
        PropertyModule,
        TransModule,
        CategoryModule,
        EventModule,
    ],
    controllers: [PropertyGroupController],
    providers: [PropertyGroupService],
})
export default class PropertyGroupModule { }
