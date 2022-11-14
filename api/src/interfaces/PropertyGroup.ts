import { PropertyI } from './Property';

interface PropertyGroupBaseI {
    id?: number;
    title: string;
    alt_name: string;
    properties?: Array<PropertyI> | null;
}

export interface PropertyGroupI extends PropertyGroupBaseI {
    comment?: string;
}

export interface PropertyGroupPublicI extends PropertyGroupBaseI {}
