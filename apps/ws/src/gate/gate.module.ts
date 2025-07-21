import { Module } from "@nestjs/common";

import { GateGateway } from "./gate.gateway";
import ConfigModule from "@common/config/config.module";
import GateListener from "./gate.listener";

@Module({
    imports: [ConfigModule],
    providers: [GateGateway, GateListener],
})
export default class GateModule { }
