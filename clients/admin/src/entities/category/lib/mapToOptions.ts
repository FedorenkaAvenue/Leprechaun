import OptionModel from "@shared/models/Option";
import { CategoryPreviewModel } from "../model/CategoryPreview";
import TransModel from "@shared/models/Trans";

export default function mapToOptions(categories: CategoryPreviewModel[], lang: keyof TransModel): OptionModel[] {
    return categories.map(i => ({ id: i.url, title: i.title[lang] }));
}
