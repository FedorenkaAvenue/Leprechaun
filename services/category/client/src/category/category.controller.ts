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
} from "@fedorenkaavenue/leprechaun_lib_entities/server/category";
import { Empty } from "@fedorenkaavenue/leprechaun_lib_entities/server/google/protobuf/empty";
import { CategoryPreview, CategoryPreviewPublic } from "@fedorenkaavenue/leprechaun_lib_entities/server/_category_preview";
import { ValidateRPCDTO } from "@fedorenkaavenue/leprechaun_lib_utils/decorators";

import { CategoryCreateDTO, CategoryUpdateDTO } from "./category.dto";
import CategoryService from "./category.service";

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

    @ValidateRPCDTO(CategoryCreateDTO)
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

    @ValidateRPCDTO(CategoryUpdateDTO)
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
