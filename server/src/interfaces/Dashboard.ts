import { IBaseProduct } from './Product';

type TDashboard = Array<IBaseProduct>

export interface ICommonDashboards {
    newest: TDashboard
    popular: TDashboard
}

export interface IUserDashboards {
    visited: TDashboard
}
