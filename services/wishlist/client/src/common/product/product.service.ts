import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { Product, PRODUCT_SERVICE_NAME, ProductPreviewPublic, ProductServiceClient } from "gen/product";
import { QueryCommonParams } from "gen/common";

@Injectable()
export default class ProductService implements OnModuleInit {
    private productClient: ProductServiceClient;

    constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) { }

    onModuleInit() {
        this.productClient = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
    }

    public getProductListPublic(ids: Product['id'][], queries: QueryCommonParams): Observable<ProductPreviewPublic[]> {
        return this.productClient.getProductListByIdsPublic({ ids, queries }).pipe(
            map(res => res.items)
        )
    }
}
