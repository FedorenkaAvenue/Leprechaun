import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PropertyGroupEntity } from "./propertyGroup.entity";
import PropertyModule from "../property/property.module";
import PropertyGroupController from "./propertyGroup.controller";
import PropertyGroupService from "./propertyGroup.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([PropertyGroupEntity]),
        PropertyModule
    ],
    controllers: [PropertyGroupController],
    providers: [PropertyGroupService],
})
export default class PropertyGroupModule { }
