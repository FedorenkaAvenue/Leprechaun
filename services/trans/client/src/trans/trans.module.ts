import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TransEntity } from "./trans.entity";
import TransService from "./trans.service";
import TransController from "./trans.controller";
import TransListener from "./trans.listener";

@Module({
    imports: [TypeOrmModule.forFeature([TransEntity])],
    controllers: [TransController, TransListener],
    providers: [TransService],
})
export default class TransModule { }
