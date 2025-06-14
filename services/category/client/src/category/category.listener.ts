import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import CategoryService from "src/category/category.service";

@Controller()
export default class CategoryListener {
    constructor(private readonly categoryService: CategoryService) { }

    @EventPattern('propgroup.deleted')
    private propertyGroupDeleteListener(@Payload() request: any): void {
        this.categoryService.removePropertyGroup(request.id);
    }
}
