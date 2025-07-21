import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
    Product,
    PRODUCT_SERVICE_NAME,
    ProductCU,
    ProductListPrivate,
    ProductListPublic,
    ProductPreview,
    ProductPublic,
    ProductQueryParams,
    ProductServiceClient,
    ProductUpdateParams,
} from '@fedorenkaavenue/leprechaun_lib_entities/server/product';
import { File, QueryCommonParams } from '@fedorenkaavenue/leprechaun_lib_entities/server/common';
import { Empty } from '@fedorenkaavenue/leprechaun_lib_entities/server/google/protobuf/empty';

import { PRODUCT_PACKAGE } from './product.constants';
import { catchResponceError } from '@pipes/operators';
import { User } from '@fedorenkaavenue/leprechaun_lib_entities/server/user';

@Injectable()
export default class ProductService implements OnModuleInit {
    private productClient: ProductServiceClient;

    constructor(@Inject(PRODUCT_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.productClient = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
    }

    public async createProduct(newProduct: ProductCU, images: File[]): Promise<ProductPreview> {
        return lastValueFrom(this.productClient.createProduct({ ...newProduct, images }).pipe(catchResponceError));
    }

    public async getProductPrivate(id: Product['id']): Promise<Product> {
        return lastValueFrom(this.productClient.getProductPrivate({ id }).pipe(catchResponceError))
    }

    public async getProductPublic(
        id: Product['id'],
        user: User['id'],
        queries: QueryCommonParams,
    ): Promise<ProductPublic> {
        return lastValueFrom(this.productClient.getProductPublic({ id, user, queries }).pipe(catchResponceError))
    }

    public async getProductPrivateList(searchParams: ProductQueryParams): Promise<ProductListPrivate> {
        return lastValueFrom(this.productClient.getProductListByParamsPrivate(searchParams).pipe(catchResponceError));
    }

    public async getProductPublicList(searchParams: ProductQueryParams): Promise<ProductListPublic> {
        return lastValueFrom(this.productClient.getProductListByParamsPublic(searchParams).pipe(catchResponceError));
    }

    public async updateProduct(productId: Product['id'], updates: ProductUpdateParams['data']): Promise<Empty> {
        return lastValueFrom(
            this.productClient.updateProduct({ id: productId, data: updates }).pipe(catchResponceError)
        );
    }

    public async deleteProduct(productId: string): Promise<Empty> {
        return lastValueFrom(this.productClient.deleteProduct({ id: productId }).pipe(catchResponceError));
    }
}
