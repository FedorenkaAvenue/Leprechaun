import { FilterType } from './Filter';
import { IProperty } from './Property';

export interface IPropertyGroup {
    id?: number
    title: string
    alt_name: string
    type: FilterType
    properties?: Array<IProperty> | null
    comment?: string
}
