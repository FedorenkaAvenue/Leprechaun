import { IProperty } from './Property';
import { IPropertyGroup } from './PropertyGroup';

export interface IFilterGroup extends IPropertyGroup {
    properties: Array<IFilter> | null
}

export interface IFilter extends IProperty {
    selected: boolean
    amount: number
    available: number
}
