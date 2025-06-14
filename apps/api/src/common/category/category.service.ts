import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { Category, CATEGORY_SERVICE_NAME, CategoryCU, CategoryServiceClient } from '@gen/category';
import { CATEGORY_PACKAGE } from './category.constant';
import { CategoryCUSchema } from '@domains/private/domains/category/category.schema';
import { Empty } from '@gen/google/protobuf/empty';
import { CategoryPreview } from '@gen/category_preview';
import { catchResponceError } from '@pipes/operators';

@Injectable()
export default class CategoryService implements OnModuleInit {
    private categoryClient: CategoryServiceClient;

    constructor(@Inject(CATEGORY_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.categoryClient = this.client.getService<CategoryServiceClient>(CATEGORY_SERVICE_NAME);
    }

    public async getCategoryPrivateList(): Promise<CategoryPreview[]> {
        const { items } = await lastValueFrom(this.categoryClient.getCategoryPrivateList({}).pipe(catchResponceError));

        return items;
    }

    public async createCategory(
        newCategory: CategoryCUSchema, icon: Express.Multer.File | undefined,
    ): Promise<CategoryPreview> {
        return lastValueFrom(this.categoryClient.createCategory({ ...newCategory, icon }).pipe(catchResponceError));
    }

    public async getCategoryPrivate(url: Category['url']): Promise<Category> {
        return lastValueFrom(this.categoryClient.getCategoryPrivate({ url }).pipe(catchResponceError));
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
