import { ApiProperty } from '@nestjs/swagger';

import { CommonDashboardsI, UserDashboardsI } from '@interfaces/Dashboard';
import { ProductPreview } from '@dto/Product/constructor';

export class CommonDashboardsDTO implements CommonDashboardsI {
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
}

export class UserDashboardsDTO implements UserDashboardsI {
    @ApiProperty({
        description: 'recently visited products',
        type: ProductPreview,
        isArray: true,
        required: false,
    })
    history: ProductPreview[];
}
