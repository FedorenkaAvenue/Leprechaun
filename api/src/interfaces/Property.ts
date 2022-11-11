import { PropertyGroupI } from './PropertyGroup';

export interface PropertyI {
    id?: number;
    property_group?: PropertyGroupI;
    title: string;
    alt_name: string;
    comment?: string;
}
