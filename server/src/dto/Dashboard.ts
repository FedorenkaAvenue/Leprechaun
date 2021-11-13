import { ApiProperty } from '@nestjs/swagger';

import { ICommonDashboards, IUserDashboards } from '@interfaces/Dashboard';
import { IBaseProduct } from '@interfaces/Product';
import { ProductBaseEntity } from '@entities/Product';

export class CommonDashboardsDTO implements ICommonDashboards {
    @ApiProperty({ description: 'popular products', type: ProductBaseEntity, isArray: true })
    popular: IBaseProduct[];

    @ApiProperty({ description: 'new products', type: ProductBaseEntity, isArray: true })
    newest: IBaseProduct[];

    constructor({ popular, newest } : ICommonDashboards) {
        this.popular = popular;
        this.newest = newest;
    }
}

export class UserDashboardsDTO implements IUserDashboards {
    @ApiProperty({ description: 'recently visited products', type: ProductBaseEntity, isArray: true })
    visited: IBaseProduct[];

    constructor({ visited }: IUserDashboards) {
        this.visited = visited;
    }
}
