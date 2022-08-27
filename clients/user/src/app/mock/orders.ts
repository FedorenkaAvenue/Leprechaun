import { OrderStatus } from '@shared/enums/order-status.enum';
import { OrderI } from '@shared/models';
import { PRODUCT_PREVIEW_LIST } from './product-preview-list';



export const ORDERS_HISTORY: Array<OrderI> = [



    
  {
    id: '1',
    status: OrderStatus.INIT,
    list: [
      {
        id: '1',
        amount: 0,
        product: PRODUCT_PREVIEW_LIST[0],
        summaryPrice: {},
      },
    ],
    summary: {
      price: {
        current: 0,
        old: 0,
      },
      productsAmount: 0,
    },
  },











  {
    id: '2',
    status: OrderStatus.CANCELED,
    list: [
      {
        id: '2',
        amount: 0,
        product: PRODUCT_PREVIEW_LIST[1],
        summaryPrice: {},
      },
    ],
    summary: {
      price: {
        current: 0,
        old: 0,
      },
      productsAmount: 0,
    },
  },
  {
    id: '3',
    status: OrderStatus.COMPLETED,
    list: [
      {
        id: '3',
        amount: 0,
        product: PRODUCT_PREVIEW_LIST[2],
        summaryPrice: {},
      },
    ],
    summary: {
      price: {
        current: 0,
        old: 0,
      },
      productsAmount: 0,
    },
  },
  {
    id: '4',
    status: OrderStatus.IN_PROCESS,
    list: [
      {
        id: '4',
        amount: 0,
        product: PRODUCT_PREVIEW_LIST[3],
        summaryPrice: {},
      },
    ],
    summary: {
      price: {
        current: 0,
        old: 0,
      },
      productsAmount: 0,
    },
  },
  {
    id: '5',
    status: OrderStatus.POSTED,
    list: [
      {
        id: '5',
        amount: 0,
        product: PRODUCT_PREVIEW_LIST[4],
        summaryPrice: {},
      },
    ],
    summary: {
      price: {
        current: 0,
        old: 0,
      },
      productsAmount: 0,
    },
  },
];
