import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TransEntity } from "./trans.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TransEntity])],
})
export default class TransModule { }
