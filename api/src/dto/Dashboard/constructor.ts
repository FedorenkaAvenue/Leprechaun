import { CommonDashboardsI, UserDashboardsI } from '@interfaces/Dashboard';
import { CommonDashboardsDTO, UserDashboardsDTO } from '.';
import { ProductPreview } from '@dto/Product/constructor';
import { ProductEntity } from '@entities/Product';
import { HistoryEntity } from '@entities/History';
import { QueriesProductT } from '@interfaces/Queries';

interface CommonDashboardsIConstructorI {
    popular: ProductEntity[];
    newest: ProductEntity[];
}

interface UserDashboardsIConstructorI {
    history: HistoryEntity[];
}

export class CommonDashboards extends CommonDashboardsDTO implements CommonDashboardsI {
    constructor({ popular, newest }: CommonDashboardsIConstructorI, searchParams: QueriesProductT) {
        super();
        this.popular = popular.map(prod => new ProductPreview(prod, searchParams));
        this.newest = newest.map(prod => new ProductPreview(prod, searchParams));
    }
}

export class UserDashboards extends UserDashboardsDTO implements UserDashboardsI {
    constructor({ history }: UserDashboardsIConstructorI, searchParams: QueriesProductT) {
        super();
        this.history = history.map(({ product }) => new ProductPreview(product, searchParams));
    }
}
