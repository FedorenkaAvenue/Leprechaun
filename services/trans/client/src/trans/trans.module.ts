import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TransEntity } from "./trans.entity";
import TransService from "./trans.service";
import TransController from "./trans.controller";

@Module({
    imports: [TypeOrmModule.forFeature([TransEntity])],
    controllers: [TransController],
    providers: [TransService],
})
export default class TransModule { }
