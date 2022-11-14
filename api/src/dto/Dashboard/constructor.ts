import { CommonDashboardsI, UserDashboardsI } from '@interfaces/Dashboard';
import { ProductI, ProductPreviewI } from '@interfaces/Product';
import { CommonDashboardsDTO, UserDashboardsDTO } from '.';
import { ProductPreview } from '@dto/Product/constructor';

interface CommonDashboardsIConstructorI {
    popular: Array<ProductI>;
    newest: Array<ProductI>;
}

interface UserDashboardsIConstructorI {
    history: Array<ProductPreviewI>;
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
