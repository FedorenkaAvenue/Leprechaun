import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";
import {
    Category,
    CATEGORY_SERVICE_NAME,
    CategoryListPrivate,
    CategoryServiceClient,
    CategoryWithPropertyGroupsSearchParams,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/category";

@Injectable()
export default class CategoryService implements OnModuleInit {
    private categoryClient: CategoryServiceClient;

    constructor(@Inject('CATEGORY_PACKAGE') private client: ClientGrpc) { }

    onModuleInit() {
        this.categoryClient = this.client.getService<CategoryServiceClient>(CATEGORY_SERVICE_NAME);
    }

    getCategoryListByPropertyGroups(data: CategoryWithPropertyGroupsSearchParams): Observable<CategoryListPrivate> {
        return this.categoryClient.getCategoryListByPropertyGroups(data);
    }

    getCategoryPrivate(id: Category['id']): Observable<Category> {
        return this.categoryClient.getCategoryPrivate({ id });
    }
}
