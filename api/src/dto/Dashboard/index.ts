import { ApiProperty } from '@nestjs/swagger';

import { ICommonDashboards, IUserDashboards } from '@interfaces/Dashboard';
import { IProductPreview } from '@interfaces/Product';
import { ProductPreviewDTO } from '@dto/Product';

export class CommonDashboardsDTO implements ICommonDashboards {
    @ApiProperty({
        description: 'popular products',
        type: ProductPreviewDTO,
        isArray: true,
        required: false,
    })
    popular: IProductPreview[];

    @ApiProperty({
        description: 'new products',
        type: ProductPreviewDTO,
        isArray: true,
        required: false,
    })
    newest: IProductPreview[];
}

export class UserDashboardsDTO implements IUserDashboards {
    @ApiProperty({
        description: 'recently visited products',
        type: ProductPreviewDTO,
        isArray: true,
        required: false,
    })
    history: IProductPreview[];
}
