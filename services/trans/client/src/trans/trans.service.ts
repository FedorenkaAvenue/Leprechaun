import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RpcException } from "@nestjs/microservices";
import { status } from '@grpc/grpc-js';

import { Trans, TransDTO } from "gen/ts/trans";
import { TransEntity } from "./trans.entity";

@Injectable()
export default class TransService {
    constructor(
        @InjectRepository(TransEntity) protected readonly transRepo: Repository<TransEntity>,
    ) { }

    async getTrans({ id }: TransDTO): Promise<Trans> {
        const trans = await this.transRepo.findOneBy({ id });

        if (!trans) throw new RpcException({ code: status.NOT_FOUND, message: 'Trans not found' });

        return trans;
    }
}
