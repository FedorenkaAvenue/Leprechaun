import { Property } from "../model/interfaces";
import { Option } from '@shared/models/interfaces';

export default function mapPropertyListToOptions(propertyList: Property[]): Option[] {
    return propertyList.map(i => ({ title: i.title.en, id: i.id }));
}
