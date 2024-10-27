import OptionModel from "@shared/models/Option";
import PropertyGroupPreviewModel from "../model/PropertyGroup";

export default function mapToOptions(propGroups: PropertyGroupPreviewModel[]): OptionModel[] {
    return propGroups.map(i => ({ id: i.id, title: i.title.en }));
}
