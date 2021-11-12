import { ApiProperty } from '@nestjs/swagger';

import { ICommonDashboards, IUserDashboards } from '@interfaces/Dashboard';
import { IProduct } from '@interfaces/Product';
import { ProductEntity } from '@entities/Product';

export class CommonDashboardsDTO implements ICommonDashboards {
    @ApiProperty({ description: 'popular products', type: ProductEntity, isArray: true })
    popular: IProduct[];

    @ApiProperty({ description: 'new products', type: ProductEntity, isArray: true })
    newest: IProduct[];

    constructor({ popular, newest } : ICommonDashboards) {
        this.popular = popular;
        this.newest = newest;
    }
}

export class UserDashboardsDTO implements IUserDashboards {
    @ApiProperty({ description: 'resenty visited products', type: ProductEntity, isArray: true })
    visited: IProduct[];

    constructor({ visited }: IUserDashboards) {
        this.visited = visited;
    }
}
