import { ApiProperty } from '@nestjs/swagger';

import { CommonDashboardsI, UserDashboardsI } from '@interfaces/Dashboard';
import { ProductPreviewI } from '@interfaces/Product';
import { ProductPreviewDTO } from '@dto/Product';

export class CommonDashboardsDTO implements CommonDashboardsI {
    @ApiProperty({
        description: 'popular products',
        type: ProductPreviewDTO,
        isArray: true,
        required: false,
    })
    popular: ProductPreviewI[];

    @ApiProperty({
        description: 'new products',
        type: ProductPreviewDTO,
        isArray: true,
        required: false,
    })
    newest: ProductPreviewI[];
}

export class UserDashboardsDTO implements UserDashboardsI {
    @ApiProperty({
        description: 'recently visited products',
        type: ProductPreviewDTO,
        isArray: true,
        required: false,
    })
    history: ProductPreviewI[];
}
