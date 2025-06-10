import {
    Category,
    CategoryCU,
    CategoryPreview,
    CategoryPrivateList,
    CategorySearchParams,
    CategoryServiceController,
    CategoryServiceControllerMethods,
    CategoryUpdateParams,
} from "gen/ts/category";
import CategoryService from "./category.service";
import { ValidateDTO } from "@shared/decorators/ValidateDTO.decorator";
import { CategoryCreateDTO, CategoryUpdateDTO } from "./category.dto";
import { Empty } from "gen/ts/google/protobuf/empty";

@CategoryServiceControllerMethods()
export default class CategoryController implements CategoryServiceController {
    constructor(
        private readonly categoryService: CategoryService,
    ) { }

    getCategoryPrivate({ url }: CategorySearchParams): Promise<Category> {
        return this.categoryService.getCategory(url);
    }

    @ValidateDTO(CategoryCreateDTO)
    createCategory(body: CategoryCU): Promise<CategoryPreview> {
        return this.categoryService.createCategory(body);
    }

    async getCategoryPrivateList(request: Empty): Promise<CategoryPrivateList> {
        const res = await this.categoryService.getCategoryList();

        return { items: res };
    }

    @ValidateDTO(CategoryUpdateDTO)
    updateCategory({ id, data }: CategoryUpdateParams): Promise<void> {
        return this.categoryService.updateCategory(id, data);
    }
}
