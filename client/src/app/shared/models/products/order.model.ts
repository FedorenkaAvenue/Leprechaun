import { OrderStatus } from '@shared/enums/order-status.enum';
import { ProductStatus } from '@shared/enums/product-status.enum';
import { PriceI } from './product-price.model';

export interface OrderProductI {
  id: string;
  amount: number;
  product: any;
  // id: string;
  // title: string;
  // status: ProductStatus;
  // price: PriceI;
  // image: string;
}

export interface OrderI {
  id: string;
  status: OrderStatus;
  list: Array<OrderCardItemDto>;
}

export class OrderDto {
  id: string;
  status: OrderStatus;
  list: Array<OrderCardItemDto>;
  constructor(order?: OrderI) {
    const { id, status, list } = order || {};
    this.id = id || null;
    this.status = status || null;
    this.list = list || null;
  }
}

export class OrderCardItemDto {
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

export class CustomerData {
  name: string;
  phone: any;
}
