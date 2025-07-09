import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";
import {
    Product, PRODUCT_SERVICE_NAME, ProductPreviewPublic, ProductServiceClient,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/product";
import { QueryCommonParams } from "@fedorenkaavenue/leprechaun_lib_entities/server/common";

@Injectable()
export default class ProductService implements OnModuleInit {
    private productClient: ProductServiceClient;

    constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) { }

    onModuleInit() {
        this.productClient = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
    }

    public getProductListByIdsPublic(
        ids: Product['id'][],
        queries: QueryCommonParams,
    ): Observable<ProductPreviewPublic[]> {
        return this.productClient.getProductListByIdsPublic({ ids, queries }).pipe(
            map(res => res.items)
        )
    }
}
