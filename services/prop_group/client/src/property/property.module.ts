import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PropertyEntity } from "./property.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PropertyEntity])],
    exports: [TypeOrmModule],
})
export default class PropertyModule { }
