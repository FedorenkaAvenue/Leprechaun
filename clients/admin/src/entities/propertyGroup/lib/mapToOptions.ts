import { Option } from "@shared/models/interfaces";
import { PropertyGroupPreview } from "../model/interfaces";


export default function mapToOptions(propGroups: PropertyGroupPreview[]): Option[] {
    return propGroups.map(i => ({ id: String(i.id), title: i.title.en }));
}
