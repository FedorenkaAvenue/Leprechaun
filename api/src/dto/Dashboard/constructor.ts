import { CommonDashboardsI, UserDashboardsI } from '@interfaces/Dashboard';
import { CommonDashboardsDTO, UserDashboardsDTO } from '.';
import { ProductPreview } from '@dto/Product/constructor';
import { ProductEntity } from '@entities/Product';

interface CommonDashboardsIConstructorI {
    popular: ProductEntity[];
    newest: ProductEntity[];
}

interface UserDashboardsIConstructorI {
    history: ProductPreview[];
}

export class CommonDashboards extends CommonDashboardsDTO implements CommonDashboardsI {
    constructor({ popular, newest }: CommonDashboardsIConstructorI) {
        super();
        this.popular = popular.map(prod => new ProductPreview(prod));
        this.newest = newest.map(prod => new ProductPreview(prod));
    }
}

export class UserDashboards extends UserDashboardsDTO implements UserDashboardsI {
    constructor({ history }: UserDashboardsIConstructorI) {
        super();
        this.history = history;
    }
}
