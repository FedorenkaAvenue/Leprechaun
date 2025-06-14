import { map, Observable } from "rxjs";
import { Controller } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { status } from "@grpc/grpc-js";

import {
    Category,
    CategoryCU,
    CategoryPrivateList,
    CategorySearchParams,
    CategoryServiceController,
    CategoryServiceControllerMethods,
    CategoryUpdateParams,
    CategoryWithPropertyGroupsSearchParams,
} from "gen/ts/category";
import CategoryService from "./category.service";
import { ValidateDTO } from "@shared/decorators/ValidateDTO.decorator";
import { CategoryCreateDTO, CategoryUpdateDTO } from "./category.dto";
import { Empty } from "gen/ts/google/protobuf/empty";
import { CategoryPreview } from "gen/ts/category_preview";

@Controller()
@CategoryServiceControllerMethods()
export default class CategoryController implements CategoryServiceController {
    constructor(
        private readonly categoryService: CategoryService,
    ) { }

    getCategoryPrivate({ id, url }: CategorySearchParams): Observable<Category> {
        return this.categoryService.getCategory(id, url);
    }

    @ValidateDTO(CategoryCreateDTO)
    createCategory(body: CategoryCU): Promise<CategoryPreview> {
        return this.categoryService.createCategory(body);
    }

    getCategoryPrivateList(request: Empty): Observable<CategoryPrivateList> {
        return this.categoryService.getCategoryList().pipe(
            map(res => ({ items: res }))
        );
    }

    @ValidateDTO(CategoryUpdateDTO)
    updateCategory({ id, data }: CategoryUpdateParams): Promise<void> {
        return this.categoryService.updateCategory(id, data);
    }

    getCategoryListByPropertyGroups(
        { propertyGroupId }: CategoryWithPropertyGroupsSearchParams
    ): Observable<CategoryPrivateList> {
        return this.categoryService.getCategoryListByPropertyGroups(propertyGroupId).pipe(
            map(items => ({ items }))
        );
    }

    deleteCategory({ id }: CategorySearchParams): Promise<void> {
        if (!id) throw new RpcException({
            code: status.INVALID_ARGUMENT,
            message: `no category id provided`,
        });

        return this.categoryService.deleteCategory(id);
    }
}
