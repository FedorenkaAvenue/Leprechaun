import OptionModel from "@shared/models/Option";
import PropertyGroupModel from "../model/PropertyGroup";

export default function mapToOptions(propGroups: PropertyGroupModel[]): OptionModel[] {
    return propGroups.map(i => ({ id: i.id, title: i.title.en }));
}
