import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";

import {
    CATEGORY_SERVICE_NAME, CategoryPrivateList, CategoryServiceClient, CategoryWithPropertyGroupsSearchParams,
} from "gen/ts/category";

@Injectable()
export default class CategoryService implements OnModuleInit {
    private categoryClient: CategoryServiceClient;

    constructor(@Inject('CATEGORY_PACKAGE') private client: ClientGrpc) { }

    onModuleInit() {
        this.categoryClient = this.client.getService<CategoryServiceClient>(CATEGORY_SERVICE_NAME);
    }

    getCategoryListByPropertyGroups(data: CategoryWithPropertyGroupsSearchParams): Observable<CategoryPrivateList> {
        return this.categoryClient.getCategoryListByPropertyGroups(data);
    }
}
