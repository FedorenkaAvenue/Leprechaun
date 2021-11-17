import { FilterType, IListFilter, IFilterGroup, IFilters, IRangeFilter } from "@interfaces/Filter";
import { IPropertyGroup } from "@interfaces/PropertyGroup";
import { IProperty } from "@interfaces/Property";
import { ISearchReqQueries } from "@interfaces/Queries";
import { SearchQueriesDTO } from "./Queries";

export class FiltersDTO implements IFilters {
    price: any;
    dinamicFilters: IFilterGroup[];

    constructor(propertyGroups: IPropertyGroup[], queryFilters: ISearchReqQueries) {
        const { price, dinamicFilters } = new SearchQueriesDTO(queryFilters);
        console.log(price);
        
        
        this.price = null;
        this.dinamicFilters = propertyGroups.map(
            propGr => new FilterGroupDTO(propGr, dinamicFilters[propGr.alt_name])
        )
    }
}

class FilterGroupDTO implements IFilterGroup {
    title: string;
    alt_name: string;
    type: FilterType;
    list: IListFilter[];

    constructor({ title, alt_name, type, properties }: IPropertyGroup, selectedFilters: string | undefined) { 
        this.alt_name = alt_name;
        this.title = title;
        this.type = type;
        this.list = properties.map(
            prop => new FilterDTO(prop, prop.id === Number(selectedFilters))
        )
    }
}

class FilterDTO implements IListFilter {
    id: number;
    title: string;
    alt_name: string;
    selected: boolean;

    constructor({ title, alt_name, id }: IProperty, isSelected: boolean) { 
        this.title = title;
        this.id = id;
        this.alt_name = alt_name;
        this.selected = isSelected
    }
}

class RangeFilterDTO implements IRangeFilter {
    from: number;
    to: number;
}
