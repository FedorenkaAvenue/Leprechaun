import { PropertyI, PropertyPublicI } from "./Property";
import { PropertyGroupI, PropertyGroupPublicI } from "./PropertyGroup";

export interface OptionI extends PropertyGroupI {
    properties: PropertyI[];
}

export interface OptionPublicI extends PropertyGroupPublicI {
    properties: PropertyPublicI[];
}
