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
    CategoryPrivateSearchParams,
    CategoryPublic,
    CategoryPublicSearchParams,
    CategoryServiceController,
    CategoryServiceControllerMethods,
    CategoryUpdateParams,
    CategoryWithPropertyGroupsSearchParams,
} from "gen/category";
import CategoryService from "./category.service";
import { ValidateDTO } from "@shared/decorators/ValidateDTO.decorator";
import { CategoryCreateDTO, CategoryUpdateDTO } from "./category.dto";
import { Empty } from "gen/google/protobuf/empty";
import { CategoryPreview, CategoryPreviewPublic } from "gen/_category_preview";

@Controller()
@CategoryServiceControllerMethods()
export default class CategoryController implements CategoryServiceController {
    constructor(
        private readonly categoryService: CategoryService,
    ) { }

    getCategoryPrivate({ id, url }: CategoryPrivateSearchParams): Observable<Category> {
        return this.categoryService.getCategoryPrivate(id, url);
    }

    getCategoryPublic({ url, id, queries }: CategoryPublicSearchParams): Observable<CategoryPublic> {
        return this.categoryService.getCategoryPublic({ url, id }, queries);
    }

    getCategoryPreviewPrivate(params: CategoryPrivateSearchParams): Observable<CategoryPreview> {
        return this.categoryService.getCategoryPreviewPrivate(params);
    }

    getCategoryPreviewPublic({ url, id, queries }: CategoryPublicSearchParams): Observable<CategoryPreviewPublic> {
        return this.categoryService.getCategoryPreviewPublic({ url, id }, queries);
    }

    @ValidateDTO(CategoryCreateDTO)
    createCategory(body: CategoryCU): Promise<CategoryPreview> {
        return this.categoryService.createCategory(body);
    }

    getCategoryListPrivate(request: Empty): Observable<CategoryListPrivate> {
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

    deleteCategory({ id }: CategoryPrivateSearchParams): Promise<void> {
        if (!id) throw new RpcException({
            code: status.INVALID_ARGUMENT,
            message: `no category id provided`,
        });

        return this.categoryService.deleteCategory(id);
    }
}
