import { map, Observable } from "rxjs";
import { Controller } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { status } from "@grpc/grpc-js";

import {
    Category,
    CategoryCU,
    CategoryListPrivate,
    CategoryListPublic,
    CategoryListSearchParamsPublic,
    CategorySearchParams,
    CategoryServiceController,
    CategoryServiceControllerMethods,
    CategoryUpdateParams,
    CategoryWithPropertyGroupsSearchParams,
} from "gen/category";
import CategoryService from "./category.service";
import { ValidateDTO } from "@shared/decorators/ValidateDTO.decorator";
import { CategoryCreateDTO, CategoryUpdateDTO } from "./category.dto";
import { Empty } from "gen/google/protobuf/empty";
import { CategoryPreview } from "gen/category_preview";

@Controller()
@CategoryServiceControllerMethods()
export default class CategoryController implements CategoryServiceController {
    constructor(
        private readonly categoryService: CategoryService,
    ) { }

    getCategory({ id, url }: CategorySearchParams): Observable<Category> {
        return this.categoryService.getCategory(id, url);
    }

    getCategoryPreview({ id, url }: CategorySearchParams): Observable<CategoryPreview> {
        return this.categoryService.getCategoryPreview(id, url);
    }

    @ValidateDTO(CategoryCreateDTO)
    createCategory(body: CategoryCU): Promise<CategoryPreview> {
        return this.categoryService.createCategory(body);
    }

    getCategoryList(request: Empty): Observable<CategoryListPrivate> {
        return this.categoryService.getCategoryListPrivate().pipe(
            map(res => ({ items: res }))
        );
    }

    getCategoryListPublic({ queries }: CategoryListSearchParamsPublic): Observable<CategoryListPublic> {
        return this.categoryService.getCategoryListPublic(queries).pipe(
            map(res => ({ items: res }))
        )
    }

    @ValidateDTO(CategoryUpdateDTO)
    updateCategory({ id, data }: CategoryUpdateParams): Promise<void> {
        return this.categoryService.updateCategory(id, data);
    }

    getCategoryListByPropertyGroups(
        { propertyGroupId }: CategoryWithPropertyGroupsSearchParams
    ): Observable<CategoryListPrivate> {
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
