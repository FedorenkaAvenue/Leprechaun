import OptionModel from "@shared/models/Option";
import PropertyModel from "../model/Property";

export default function mapPropertyListToOptions(propertyList: PropertyModel[]): OptionModel[] {
    return propertyList.map(i => ({ title: i.title.en, id: i.id }));
}
