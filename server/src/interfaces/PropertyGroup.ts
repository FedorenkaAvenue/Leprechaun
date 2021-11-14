import { IProperty } from './Property';

export interface IPropertyGroup {
    id?: number
    title: string
    type: PropertyGroupOptionType
    alt_name: string
    properties?: Array<IProperty> | null
    comment?: string
}

export enum PropertyGroupOptionType {
    List = 'list',
    Range = 'range',
}
