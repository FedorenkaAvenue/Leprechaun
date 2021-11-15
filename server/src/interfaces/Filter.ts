import { IProperty } from './Property';
import { IPropertyGroup } from './PropertyGroup';

export interface IFilters {
    price: any
    other: Array<IFilterGroup>
}

export interface IFilterGroup extends IPropertyGroup {
    type: FilterType
    properties: Array<IFilter>
}

export interface IFilter extends IProperty {
    selected: boolean
    amount: number
    available: number
}

export enum FilterType {
    List = 'list',
    Range = 'range',
}
