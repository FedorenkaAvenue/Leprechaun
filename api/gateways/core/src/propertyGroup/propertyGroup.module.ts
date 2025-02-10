import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PropertyGroupEntity } from "./propertyGroup.entity";
import TransModule from "../trans/trans.module";
import PropertyModule from "../property/property.module";

@Module({
    imports: [TypeOrmModule.forFeature([PropertyGroupEntity]), TransModule, PropertyModule],
    exports: [TypeOrmModule],
})
export default class PropertyGroupModule { }
