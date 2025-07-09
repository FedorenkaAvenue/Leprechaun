import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CategoryPreview, CategoryPreviewPublic } from '@fedorenkaavenue/leprechaun_lib_entities/server/_category_preview';
import {
    Category, CATEGORY_SERVICE_NAME, CategoryCU, CategoryPublic, CategoryServiceClient,
} from '@fedorenkaavenue/leprechaun_lib_entities/server/category';
import { QueryCommonParams } from '@fedorenkaavenue/leprechaun_lib_entities/server/common';
import { Empty } from '@fedorenkaavenue/leprechaun_lib_entities/server/google/protobuf/empty';

import { catchResponceError } from '@pipes/operators';
import { CATEGORY_PACKAGE } from './category.constant';

@Injectable()
export default class CategoryService implements OnModuleInit {
    private categoryClient: CategoryServiceClient;

    constructor(@Inject(CATEGORY_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.categoryClient = this.client.getService<CategoryServiceClient>(CATEGORY_SERVICE_NAME);
    }

    public async getCategoryListPrivate(): Promise<CategoryPreview[]> {
        const { items } = await lastValueFrom(this.categoryClient.getCategoryListPrivate({}).pipe(catchResponceError));

        return items;
    }

    public async getCategoryListPublic(queries: QueryCommonParams): Promise<CategoryPreviewPublic[]> {
        const { items } = await lastValueFrom(this.categoryClient.getCategoryListPublic({ queries }).pipe(catchResponceError));

        return items;
    }

    public async createCategory(
        newCategory: CategoryCU, icon: Express.Multer.File | undefined,
    ): Promise<CategoryPreview> {
        return lastValueFrom(this.categoryClient.createCategory({ ...newCategory, icon }).pipe(catchResponceError));
    }

    public async getCategoryPrivate(url: Category['url']): Promise<Category> {
        return lastValueFrom(this.categoryClient.getCategoryPrivate({ url }).pipe(catchResponceError));
    }

    public async getCategoryPublic(id: Category['id'], queries: QueryCommonParams): Promise<CategoryPublic> {
        return lastValueFrom(this.categoryClient.getCategoryPublic({ id, queries }).pipe(catchResponceError));
    }

    public async updateCategory(categoryId: Category['id'], updates: CategoryCU): Promise<Empty> {
        return await lastValueFrom(
            this.categoryClient.updateCategory({ id: categoryId, data: updates }).pipe(catchResponceError)
        );
    }

    public async deleteCategory(id: Category['id']): Promise<Empty> {
        return this.categoryClient.deleteCategory({ id }).pipe(catchResponceError);
    }
}
