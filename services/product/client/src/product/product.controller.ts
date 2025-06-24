import { from, map, Observable } from "rxjs";
import { Controller } from "@nestjs/common";

import {
    Product,
    ProductCU,
    ProductListPrivate,
    ProductListByCategory,
    ProductListByCategoryParams,
    ProductListByIdsParamsPublic,
    ProductListPreviewPublic,
    ProductListPublic,
    ProductPreview,
    ProductQueryParams,
    ProductPrivateSearchParams,
    ProductServiceController,
    ProductServiceControllerMethods,
    ProductUpdateParams,
} from "gen/product";
import ProductService from "./product.service";
import { ValidateDTO } from "@shared/decorators/ValidateDTO.decorator";
import { ProductCreateDTO, ProductUpdateDTO } from "./product.dto";

@Controller()
@ProductServiceControllerMethods()
export class ProductController implements ProductServiceController {
    constructor(private readonly productService: ProductService) { }

    // private

    getProductPrivate({ id }: ProductPrivateSearchParams): Observable<Product> {
        return this.productService.getProduct(id);
    }

    @ValidateDTO(ProductCreateDTO)
    createProduct(body: ProductCU): Observable<ProductPreview> {
        return this.productService.createProduct(body);
    }

    @ValidateDTO(ProductUpdateDTO)
    updateProduct({ id, data }: ProductUpdateParams): Observable<void> {
        return this.productService.updateProduct(id, data);
    }

    getProductListByParamsPrivate(searchParams: ProductQueryParams): Observable<ProductListPrivate> {
        return from(this.productService.getProductListPrivate(searchParams));
    }

    getProductListByCategory({ category }: ProductListByCategoryParams): Observable<ProductListByCategory> {
        return this.productService.getProductListByCategory(category).pipe(
            map(res => ({ items: res }))
        );
    }

    deleteProduct({ id }: ProductPrivateSearchParams): Observable<void> {
        return this.productService.deleteProduct(id);
    }

    // public

    getProductListByIdsPublic({ ids, queries }: ProductListByIdsParamsPublic): Observable<ProductListPreviewPublic> {
        return this.productService.getProductListByIdsPublic(ids, queries).pipe(
            map(res => ({ items: res }))
        )
    }

    getProductListByParamsPublic(queries: ProductQueryParams): Observable<ProductListPublic> {
        return this.productService.getProductListPublic(queries);
    }
}
