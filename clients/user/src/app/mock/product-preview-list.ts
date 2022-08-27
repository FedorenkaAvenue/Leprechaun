import { ProductLabelType } from '@shared/enums';
import { ProductStatus } from '@shared/enums/product-status.enum';
import { ProductPreviewI } from '@shared/models/products/product-preview.model';

export const PRODUCT_PREVIEW_LIST: Array<ProductPreviewI> = [
  {
    id: '1',
    title: 'sdfsdfsdfsdf',
    status: ProductStatus.AVAILABLE,
    price: {
      current: 1000,
      old: 2000,
    },
    image: 'https://www.sinsay.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/2/9/2976Q-59X-050-1-483349_1.jpg',
    labels: [
      {
        type: ProductLabelType.DISCOUNT,
        value: '-20%',
      },
    ],
  },
  {
    id: '2',
    title: 'asdasdasda',
    status: ProductStatus.AVAILABLE,
    price: {
      current: 1000,
      old: null,
    },
    image: 'https://i.pinimg.com/originals/6c/23/d5/6c23d57a23dc28fa9933209514beb78c.jpg',
    labels: [
      {
        type: ProductLabelType.NEW,
        value: 'новинки',
      },
    ],
  },
  {
    id: '3',
    title: 'asdasdasda',
    status: ProductStatus.AVAILABLE,
    price: {
      current: 1500,
      old: 2000,
    },
    image: 'https://www.sinsay.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/1/5/1544J-00X-050-1_1.jpeg',
    labels: [
      {
        type: ProductLabelType.POPULAR,
        value: 'популярні',
      },
    ],
  },
  {
    id: '4',
    title: 'asdasdasda',
    status: ProductStatus.OUT_OF_STOCK,
    price: {
      current: 1200,
      old: 3000,
    },
    image: 'https://irecommend.ru/sites/default/files/product-images/740205/JVWuqnDeDOxwzrPSWGqeuA.jpg',
    labels: [
      {
        type: ProductLabelType.POPULAR,
        value: 'популярні',
      },
    ],
  },
  {
    id: '5',
    title: 'asdasdasda',
    status: ProductStatus.AVAILABLE,
    price: {
      current: 200,
      old: 300,
    },
    image: 'https://img.joomcdn.net/fe512e8020aa63b501bce55177bd23e1482527d5_original.jpeg',
    labels: [
      {
        type: ProductLabelType.DISCOUNT,
        value: '-50%',
      },
    ],
  },

  {
    id: '6',
    title: 'asdasdasda',
    status: ProductStatus.AVAILABLE,
    price: {
      current: 999,
      old: 1000,
    },
    image: 'https://www.sinsay.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/1/4/1483J-07X-050-1-453043_1.jpg',
    labels: [
      {
        type: ProductLabelType.POPULAR,
        value: 'популярні',
      },
    ],
  },
];
