import TransModel from "@shared/models/Trans";

export interface CategoryPreviewModel {
    id: number,
    url: string,
    title: TransModel,
    icon: string,
    comment: string,
    is_public: boolean,
}
