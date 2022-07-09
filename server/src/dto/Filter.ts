import { ApiProperty } from "@nestjs/swagger";

import {
    IListFilter, IFilterListGroup, IFilters, IRangeFilter, IFilterRangeGroup, IFilterGroup
} from "@interfaces/Filter";
import { FilterType } from '@enums/Filter';
import { IPropertyGroup } from "@interfaces/PropertyGroup";
import { IProperty } from "@interfaces/Property";
import { ISearchReqQueries } from "@interfaces/Queries";
import { RangeQueryDTO, SearchQueriesDTO } from "./Queries";

class ListFilterDTO implements IListFilter {
    @ApiProperty({ required: false })
    id: number;

    @ApiProperty({ required: false })
    title: string;

    @ApiProperty({ required: false })
    alt_name: string;

    @ApiProperty({ required: false })
    selected: boolean;

    constructor({ title, alt_name, id }: IProperty, isSelected: boolean) {
        this.title = title;
        this.id = id;
        this.alt_name = alt_name;
        this.selected = isSelected;
    }
}

class RangeFilterDTO implements IRangeFilter {
    @ApiProperty({ required: false })
    min: number;

    @ApiProperty({ required: false })
    max: number;

    constructor({ min, max }: RangeQueryDTO) {
        this.min = min;
        this.max = max;
    }
}

class FilterGroupDTO implements IFilterGroup {
    @ApiProperty({ required: false })
    title: string;

    @ApiProperty({ required: false })
    alt_name: string;

    @ApiProperty({ required: false })
    type: FilterType;
}

class FilterListGroupDTO extends FilterGroupDTO implements IFilterListGroup {
    @ApiProperty({
        description: 'array of filter items',
        isArray: true,
        required: false
    })
    list: IListFilter[];

    @ApiProperty({ required: false })
    type: FilterType.List;

    constructor({ title, alt_name, properties }: IPropertyGroup, selectedFilters?: string | undefined) {
        super();
        this.alt_name = alt_name;
        this.title = title;
        this.type = FilterType.List;
        this.list = properties.map(prop => new ListFilterDTO(prop, prop.id === Number(selectedFilters)))
    }
}

class FilterRangeGroupDTO extends FilterGroupDTO implements IFilterRangeGroup {
    @ApiProperty({ type: RangeFilterDTO, required: false })
    range: IRangeFilter;

    @ApiProperty({ required: false })
    type: FilterType.Range;

    constructor({ title, alt_name }: IPropertyGroup, range: any) {
        super();
        this.alt_name = alt_name;
        this.title = title;
        this.type = FilterType.Range;
        this.range = range;
    }
}

export class FiltersDTO implements IFilters {
    @ApiProperty({
        type: FilterRangeGroupDTO,
        description: 'static price filter',
        required: false
    })
    price: IFilterRangeGroup;

    @ApiProperty({
        type: FilterListGroupDTO,
        isArray: true,
        required: false
    })
    dinamicFilters: IFilterListGroup[];

    @ApiProperty({
        type: FilterListGroupDTO,
        required: false
    })
    status: IFilterListGroup;

    constructor(propertyGroups: IPropertyGroup[], queryFilters: ISearchReqQueries) {
        const { price, dinamicFilters, status } = new SearchQueriesDTO(queryFilters);
        
        this.price = new FilterRangeGroupDTO(
            {
                title: 'Цiна',
                alt_name: 'price'
            },
            new RangeFilterDTO(price || { min: 0, max: 100000 })
        );
        this.dinamicFilters = dinamicFilters ?
            propertyGroups.map(propGr => new FilterListGroupDTO(propGr, dinamicFilters[propGr.alt_name])) :
            propertyGroups.map(propGr => new FilterListGroupDTO(propGr));
    }
}
