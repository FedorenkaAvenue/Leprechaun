import OptionModel from "@shared/models/Option";
import { CategoryPreviewModel } from "../model/CategoryPreview";

export default function mapToOptions(categories: CategoryPreviewModel[]): OptionModel[] {
    return categories.map(i => ({ title: i.url, id: i.id }));
}
