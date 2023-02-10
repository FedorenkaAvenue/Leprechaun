import { PropertyI } from './Property';
import { TransI } from './Trans';

interface BaseI<T = TransI> {
    id?: number;
    title: T;
    alt_name: string;
    properties?: PropertyI[] | null;
}

export interface PropertyGroupI extends BaseI {
    is_primary?: boolean;
    comment?: string;
}

export type PropertyGroupPublicI = BaseI<string>;
