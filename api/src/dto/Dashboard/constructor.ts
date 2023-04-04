import { ApiProperty } from '@nestjs/swagger';

import { CommonDashboardsI, UserDashboardsI } from '@interfaces/Dashboard';
import { ProductPreview } from '@dto/Product/constructor';
import { ProductEntity } from '@entities/Product';
import { HistoryEntity } from '@entities/History';
import { QueriesCommon } from '@dto/Queries/constructor';

interface CommonDashboardsIConstructorI {
    popular: ProductEntity[];
    newest: ProductEntity[];
}

interface UserDashboardsIConstructorI {
    history: HistoryEntity[];
}

export class CommonDashboards implements CommonDashboardsI {
    @ApiProperty({
        description: 'popular products',
        type: ProductPreview,
        isArray: true,
        required: false,
    })
    popular: ProductPreview[];

    @ApiProperty({
        description: 'new products',
        type: ProductPreview,
        isArray: true,
        required: false,
    })
    newest: ProductPreview[];

    constructor({ popular, newest }: CommonDashboardsIConstructorI, lang: QueriesCommon['lang']) {
        this.popular = popular.map(prod => new ProductPreview(prod, lang));
        this.newest = newest.map(prod => new ProductPreview(prod, lang));
    }
}

export class UserDashboards implements UserDashboardsI {
    @ApiProperty({
        description: 'recently visited products',
        type: ProductPreview,
        isArray: true,
        required: false,
    })
    history: ProductPreview[];

    constructor({ history }: UserDashboardsIConstructorI, lang: QueriesCommon['lang']) {
        this.history = history.map(({ product }) => new ProductPreview(product, lang));
    }
}
