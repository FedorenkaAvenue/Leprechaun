import { IProperty } from './Property';

export interface IPropertyGroup {
    id?: number
    title: string
    alt_name: string
    properties?: Array<IProperty> | null
    comment?: string
}
