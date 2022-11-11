import { ApiProperty } from '@nestjs/swagger';

import {
    ListFilterI,
    FilterListGroupI,
    FiltersI,
    RangeFilterI,
    FilterRangeGroupI,
    FilterGroupT,
} from '@interfaces/Filter';
import { FilterType } from '@enums/Filter';
import { PropertyGroupI } from '@interfaces/PropertyGroup';
import { PropertyI } from '@interfaces/Property';
import { SearchReqQueriesI } from '@interfaces/Queries';
import { RangeQueryDTO } from '@dto/Queries';
import { SearchQueries } from '@dto/Queries/constructor';

class ListFilterDTO implements ListFilterI {
    @ApiProperty({ required: false })
    id: number;

    @ApiProperty({ required: false })
    title: string;

    @ApiProperty({ required: false })
    alt_name: string;

    @ApiProperty({ required: false })
    selected: boolean;

    constructor({ title, alt_name, id }: PropertyI, isSelected: boolean) {
        this.title = title;
        this.id = id;
        this.alt_name = alt_name;
        this.selected = isSelected;
    }
}

class RangeFilterDTO implements RangeFilterI {
    @ApiProperty({ required: false })
    min: number;

    @ApiProperty({ required: false })
    max: number;

    constructor({ min, max }: RangeQueryDTO) {
        this.min = min;
        this.max = max;
    }
}

class FilterGroupDTO implements FilterGroupT {
    @ApiProperty({ required: false })
    title: string;

    @ApiProperty({ required: false })
    alt_name: string;

    @ApiProperty({ required: false })
    type: FilterType;
}

class FilterListGroupDTO extends FilterGroupDTO implements FilterListGroupI {
    @ApiProperty({
        description: 'array of filter items',
        isArray: true,
        required: false,
    })
    list: ListFilterI[];

    @ApiProperty({ required: false })
    type: FilterType.List;

    constructor({ title, alt_name, properties }: PropertyGroupI, selectedFilters?: string | undefined) {
        super();
        this.alt_name = alt_name;
        this.title = title;
        this.type = FilterType.List;
        this.list = properties.map(prop => new ListFilterDTO(prop, prop.id === Number(selectedFilters)));
    }
}

class FilterRangeGroupDTO extends FilterGroupDTO implements FilterRangeGroupI {
    @ApiProperty({ type: RangeFilterDTO, required: false })
    range: RangeFilterI;

    @ApiProperty({ required: false })
    type: FilterType.Range;

    constructor({ title, alt_name }: PropertyGroupI, range: any) {
        super();
        this.alt_name = alt_name;
        this.title = title;
        this.type = FilterType.Range;
        this.range = range;
    }
}

export class FiltersDTO implements FiltersI {
    @ApiProperty({
        type: FilterRangeGroupDTO,
        description: 'static price filter',
        required: false,
    })
    price: FilterRangeGroupI;

    @ApiProperty({
        type: FilterListGroupDTO,
        isArray: true,
        required: false,
    })
    dinamicFilters: FilterListGroupI[];

    @ApiProperty({
        type: FilterListGroupDTO,
        required: false,
    })
    status: FilterListGroupI;

    constructor(propertyGroups: PropertyGroupI[], queryFilters: SearchReqQueriesI) {
        const { price, dinamicFilters, status } = new SearchQueries(queryFilters);

        this.price = new FilterRangeGroupDTO(
            {
                title: 'Цiна',
                alt_name: 'price',
            },
            new RangeFilterDTO(price || { min: 0, max: 100000 }),
        );
        this.dinamicFilters = dinamicFilters
            ? propertyGroups.map(propGr => new FilterListGroupDTO(propGr, dinamicFilters[propGr.alt_name]))
            : propertyGroups.map(propGr => new FilterListGroupDTO(propGr));
    }
}
