import { PropertyI } from "@core/property/property.interface";

export type PropertyPublicI = Pick<PropertyI<string>, 'id' | 'title' | 'alt_name'>
