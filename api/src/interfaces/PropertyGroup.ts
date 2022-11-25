import { PropertyI } from './Property';

interface BaseI {
    id?: number;
    title: string;
    alt_name: string;
    properties?: PropertyI[] | null;
}

export interface PropertyGroupI extends BaseI {
    comment?: string;
}

export type PropertyGroupPublicI = BaseI;
