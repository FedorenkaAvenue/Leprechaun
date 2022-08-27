import { OrderStatus } from '@shared/enums/order-status.enum';
import { ProductStatus } from '@shared/enums/product-status.enum';
import { ProductLabelI } from '../products/product-label.model';
import { ProductPreviewI } from '../products/product-preview.model';
import { PriceI } from '../products/product-price.model';


export interface SummaryOrderI {
  price: PriceI;
  productsAmount: number;
}

export interface OrderProductI extends ProductPreviewI {
}

export interface OrderI {
  id: string;
  status: OrderStatus;
  list: Array<OrderItemI>;
  summary: SummaryOrderI;
}

export interface OrderItemI {
  amount: number;
  id: string;
  product: OrderProductI;
  summaryPrice: any;
}

export class OrderDto implements OrderI {
  id: string;
  status: OrderStatus;
  list: Array<OrderItemI>;
  summary: SummaryOrderI;
  constructor(order?: OrderI) {
    const { id, status, list, summary } = order || {};
    this.id = id || null;
    this.status = status || null;
    this.list = list || null;
    this.summary = summary;
  }
}

export class OrderCartItemDto {
  amount: number;
  id: string;
  product: OrderProductDto;
  summaryPrice;
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


