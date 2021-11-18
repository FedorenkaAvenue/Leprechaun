import { ApiProperty } from "@nestjs/swagger";

import {
    FilterType, IListFilter, IFilterListGroup, IFilters, IRangeFilter, IFilterRangeGroup,
    IFilterGroup
} from "@interfaces/Filter";
import { IPropertyGroup } from "@interfaces/PropertyGroup";
import { IProperty } from "@interfaces/Property";
import { ISearchReqQueries } from "@interfaces/Queries";
import { RangeQueryDTO, SearchQueriesDTO } from "./Queries";

class ListFilterDTO implements IListFilter {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    alt_name: string;

    @ApiProperty()
    selected: boolean;

    constructor({ title, alt_name, id }: IProperty, isSelected: boolean) {
        this.title = title;
        this.id = id;
        this.alt_name = alt_name;
        this.selected = isSelected;
    }
}

class RangeFilterDTO implements IRangeFilter {
    @ApiProperty()
    min: number;

    @ApiProperty()
    max: number;

    constructor({ min, max }: RangeQueryDTO) {
        this.min = min;
        this.max = max;
    }
}

class FilterGroupDTO implements IFilterGroup {
    @ApiProperty()
    title: string;

    @ApiProperty()
    alt_name: string;

    @ApiProperty()
    type: FilterType;
}

class FilterListGroupDTO extends FilterGroupDTO implements IFilterListGroup {
    @ApiProperty({ description: 'array of filter items', isArray: true })
    list: IListFilter[];

    constructor({ title, alt_name, type, properties }: IPropertyGroup, selectedFilters: string | undefined) {
        super();
        this.alt_name = alt_name;
        this.title = title;
        this.type = type;
        this.list = properties.map(
            prop => new ListFilterDTO(prop, prop.id === Number(selectedFilters))
        )
    }
}

class FilterRangeGroupDTO extends FilterGroupDTO implements IFilterRangeGroup {
    @ApiProperty({ type: RangeFilterDTO })
    range: IRangeFilter;

    constructor({ title, alt_name, type }: IPropertyGroup, range: any) {
        super();
        this.alt_name = alt_name;
        this.title = title;
        this.type = type;
        this.range = range;
    }
}

export class FiltersDTO implements IFilters {
    @ApiProperty({ type: FilterRangeGroupDTO, description: 'static price filter' })
    price: IFilterRangeGroup;

    @ApiProperty({ type: FilterListGroupDTO, isArray: true })
    dinamicFilters: IFilterListGroup[] | IFilterRangeGroup[];

    constructor(propertyGroups: IPropertyGroup[], queryFilters: ISearchReqQueries) {
        const { price, dinamicFilters } = new SearchQueriesDTO(queryFilters);
        
        this.price = new FilterRangeGroupDTO(
            {
                title: 'Цiна',
                alt_name: 'price',
                type: FilterType.Range
            },
            new RangeFilterDTO(price)
        );
        this.dinamicFilters = propertyGroups.map(
            propGr => new FilterListGroupDTO(propGr, dinamicFilters[propGr.alt_name])
        )
    }
}
