import { from, map, Observable } from "rxjs";
import { Controller } from "@nestjs/common";

import {
    Product,
    ProductCU,
    ProductListByCategory,
    ProductListByCategoryParams,
    ProductPreview,
    ProductPrivateList,
    ProductQueryParams,
    ProductSearchParams,
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

    getProduct({ id }: ProductSearchParams): Observable<Product> {
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

    getProductList(searchParams: ProductQueryParams): Observable<ProductPrivateList> {
        return from(this.productService.getProductList(searchParams));
    }

    getProductListByCategory({ category }: ProductListByCategoryParams): Observable<ProductListByCategory> {
        return this.productService.getProductListByCategory(category).pipe(
            map(res => ({ items: res }))
        );
    }

    deleteProduct({ id }: ProductSearchParams): Observable<void> {
        return this.productService.deleteProduct(id);
    }
}
