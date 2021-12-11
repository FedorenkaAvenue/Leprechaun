import { IProduct } from './Product';

type TDashboard = Array<IProduct>

export interface ICommonDashboards {
    newest: TDashboard
    popular: TDashboard
}

export interface IUserDashboards {
    visited: TDashboard
}
