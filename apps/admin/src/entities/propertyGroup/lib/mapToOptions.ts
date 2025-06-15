import { PropertyGroupPreview } from "@gen/property_group";
import { Option } from "@shared/models/interfaces";

export default function mapToOptions(propGroups: PropertyGroupPreview[]): Option[] {
    return propGroups.map(i => ({ id: i.id, title: i.title.en }));
}
