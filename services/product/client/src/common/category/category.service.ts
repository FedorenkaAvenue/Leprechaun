import { CategoryPreview } from "@fedorenkaavenue/leprechaun_lib_entities/server/_category_preview";
import {
    Category, CATEGORY_SERVICE_NAME, CategoryServiceClient,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/category";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Injectable()
export default class CategoryService implements OnModuleInit {
    private categoryClient: CategoryServiceClient;

    constructor(@Inject('CATEGORY_PACKAGE') private client: ClientGrpc) { }

    onModuleInit() {
        this.categoryClient = this.client.getService<CategoryServiceClient>(CATEGORY_SERVICE_NAME);
    }

    getCategoryPreviewPrivate(id: Category['id']): Observable<CategoryPreview> {
        return this.categoryClient.getCategoryPreviewPrivate({ id });
    }
}
