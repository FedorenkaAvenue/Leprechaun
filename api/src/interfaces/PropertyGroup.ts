import { PropertyI } from './Property';

export interface PropertyGroupI {
    id?: number;
    title: string;
    alt_name: string;
    properties?: Array<PropertyI> | null;
    comment?: string;
}
