import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PropertyGroupEntity } from "./propertyGroup.entity";
import TransModule from "../trans/trans.module";

@Module({
    imports: [TypeOrmModule.forFeature([PropertyGroupEntity]), TransModule],
    exports: [TypeOrmModule],
})
export default class PropertyGroupCoreModule { }
