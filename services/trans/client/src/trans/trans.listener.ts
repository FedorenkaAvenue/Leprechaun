import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import TransService from "./trans.service";

@Controller()
export default class TransListener {
    constructor(private readonly transService: TransService) { }

    @EventPattern('propgroup.deleted')
    private propertyGroupDeleteListener(@Payload() request: any): void {
        this.transService.deleteTrans(request.title);
    }

    @EventPattern('category.deleted')
    private categoryDeleteListener(@Payload() request: any): void {
        this.transService.deleteTrans(request.title);
    }
}
