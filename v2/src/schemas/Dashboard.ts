import ProductPreviewSchema from './ProductPreview';

type DashboardT = ProductPreviewSchema[];

export interface CommonDashboardSchema {
    newest: DashboardT;
    popular: DashboardT;
}

export interface UserDashboardSchema<T = DashboardT> {
    history: T;
}
