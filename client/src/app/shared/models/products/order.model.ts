import { OrderStatus } from '@shared/enums/order-status.enum';
import { ProductStatus } from '@shared/enums/product-status.enum';
import { PriceI } from './product-price.model';

export interface OrderProductI {
  id: string;
  amount: number;
  product: any;
}

export interface SummaryOrderI {
  price: number;
  productsAmount: number;
}
export interface OrderI {
  id: string;
  status: OrderStatus;
  list: Array<OrderCartItemDto>;
  summary: SummaryOrderI;
}

export class OrderDto {
  id: string;
  status: OrderStatus;
  list: Array<OrderCartItemDto>;
  summary: SummaryOrderI;
  constructor(order?: OrderI) {
    const { id, status, list, summary } = order || {};
    this.id = id || null;
    this.status = status || null;
    this.list = list || null;
    this.summary = summary
  }
}

export class OrderCartItemDto {
  amount: number;
  id: string;
  product: OrderProductDto;
}

export class OrderProductDto {
  id: string;
  image: string;
  price: PriceI;
  status: ProductStatus;
  title: string;
}

export class ProductAmountPayload {
  order_item: string;
  amount: number;
}
export class CustomerData {
  name: string;
  phone: any;
}
