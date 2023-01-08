import PropertyGroupSchema from './PropertyGroup';

export default interface PropertySchema {
    id: number;
    title: string;
    alt_name: string;
    property_group: PropertyGroupSchema;
}
