import { ApiProperty } from '@nestjs/swagger';

import { ICommonDashboards, IUserDashboards } from '@interfaces/Dashboard';
import { IProduct, IProductPreview } from '@interfaces/Product';
import { ProductPreviewDTO } from './Product';

interface ICommonDashboardsConstructor {
    popular: Array<IProduct>
    newest: Array<IProduct>
}

interface IUserDashboardsConstructor {
    visited: Array<IProduct>
}

export class CommonDashboardsDTO implements ICommonDashboards {
    @ApiProperty({
        description: 'popular products',
        type: ProductPreviewDTO,
        isArray: true
    })
    popular: IProductPreview[];

    @ApiProperty({
        description: 'new products',
        type: ProductPreviewDTO,
        isArray: true
    })
    newest: IProductPreview[];

    constructor({ popular, newest }: ICommonDashboardsConstructor) {
        // this.popular =  popular.map(prod => new ProductPreviewDTO(prod));
        // this.newest = newest.map(prod => new ProductPreviewDTO(prod))
    }
}

export class UserDashboardsDTO implements IUserDashboards {
    @ApiProperty({
        description: 'recently visited products',
        type: ProductPreviewDTO,
        isArray: true
    })
    visited: IProductPreview[];

    constructor({ visited }: IUserDashboardsConstructor) {
        // this.visited = visited.map(prod => new ProductPreviewDTO(prod));
    }
}
