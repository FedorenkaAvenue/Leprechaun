import { ApiProperty } from '@nestjs/swagger';

import { CommonDashboardsI, UserDashboardsI } from '@interfaces/Dashboard';
import { ProductEntity } from '@entities/Product';
import { HistoryEntity } from '@entities/History';
import { QueriesCommon } from '@dto/Queries/constructor';
import { ProductPreviewPublic } from '@dto/Product/public';

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
        type: ProductPreviewPublic,
        isArray: true,
        required: false,
    })
    popular: ProductPreviewPublic[];

    @ApiProperty({
        description: 'new products',
        type: ProductPreviewPublic,
        isArray: true,
        required: false,
    })
    newest: ProductPreviewPublic[];

    constructor({ popular, newest }: CommonDashboardsIConstructorI, lang: QueriesCommon['lang']) {
        this.popular = popular.map(prod => new ProductPreviewPublic(prod, lang));
        this.newest = newest.map(prod => new ProductPreviewPublic(prod, lang));
    }
}

export class UserDashboards implements UserDashboardsI {
    @ApiProperty({
        description: 'recently visited products',
        type: ProductPreviewPublic,
        isArray: true,
        required: false,
    })
    history: ProductPreviewPublic[];

    constructor({ history }: UserDashboardsIConstructorI, lang: QueriesCommon['lang']) {
        this.history = history.map(({ product }) => new ProductPreviewPublic(product, lang));
    }
}
