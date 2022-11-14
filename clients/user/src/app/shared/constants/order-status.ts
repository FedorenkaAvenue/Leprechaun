import { OrderStatus } from '@shared/enums/order-status.enum';

export const ORDER_STATUS = {
  [OrderStatus.INIT]: {
    status: OrderStatus.INIT,
    name: 'order.status.init',
    color: 'red',
  },
  [OrderStatus.POSTED]: {
    status: OrderStatus.POSTED,
    name: 'order.status.posted',
    color: 'red',
  },
  [OrderStatus.IN_PROCESS]: {
    status: OrderStatus.IN_PROCESS,
    name: 'order.status.inProcess',
    color: 'red',
  },
  [OrderStatus.COMPLETED]: {
    status: OrderStatus.COMPLETED,
    name: 'order.status.completed',
    color: 'red',
  },
  [OrderStatus.CANCELED]: {
    status: OrderStatus.CANCELED,
    name: 'order.status.canseled',
    color: 'red',
  },
};
