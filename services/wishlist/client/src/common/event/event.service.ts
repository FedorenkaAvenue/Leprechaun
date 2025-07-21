import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Product } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";

@Injectable()
export class EventService {
    constructor(
        @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    ) { }

    async onModuleInit() {
        await this.kafkaClient.connect();
    }

    addToStatistics(id: Product['id']): Observable<any> {
        return this.kafkaClient.emit('product.like', id);
    }
}
