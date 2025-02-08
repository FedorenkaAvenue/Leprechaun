import { CategoryI } from "@core/category/category.interface";

export type CategoryPublicI = Pick<CategoryI<string>, 'id' | 'url' | 'icon' | 'title'>
