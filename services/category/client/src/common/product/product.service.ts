import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";
import { PRODUCT_SERVICE_NAME, ProductPreview, ProductServiceClient } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";
import { Category } from "@fedorenkaavenue/leprechaun_lib_entities/server/category";

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
