import { ICommonDashboards, IUserDashboards } from '@interfaces/Dashboard';
import { IProduct, IProductPreview } from '@interfaces/Product';
import { CommonDashboardsDTO, UserDashboardsDTO } from '.';
import { ProductPreview } from '@dto/Product/constructor';

interface ICommonDashboardsConstructor {
    popular: Array<IProduct>
    newest: Array<IProduct>
}

interface IUserDashboardsConstructor {
    history: Array<IProductPreview>
}

export class CommonDashboards extends CommonDashboardsDTO implements ICommonDashboards {
    constructor({ popular, newest }: ICommonDashboardsConstructor) {
        super();
        this.popular =  popular.map(prod => new ProductPreview(prod));
        this.newest = newest.map(prod => new ProductPreview(prod))
    }
}

export class UserDashboards extends UserDashboardsDTO implements IUserDashboards {
    constructor({ history }: IUserDashboardsConstructor) {
        super();
        this.history = history;
    }
}
