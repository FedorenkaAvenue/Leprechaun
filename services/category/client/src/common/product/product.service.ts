import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { PRODUCT_SERVICE_NAME, ProductPreview, ProductServiceClient } from "gen/product";
import { Category } from "gen/category";

@Injectable()
export default class ProductService implements OnModuleInit {
    private productClient: ProductServiceClient;

    constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) { }

    onModuleInit() {
        this.productClient = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
    }

    getProductListByCategory(category: Category['id']): Observable<ProductPreview[]> {
        return this.productClient.getProductListByCategory({ category }).pipe(
            map(res => res.items)
        )
    }
}
