import { ProductsBaseI, DasboardCommonProductsI } from "@shared/models";
import { PRODUCT_IMAGES_1, PRODUCT_IMAGES_2, PRODUCT_IMAGES_3 } from "./product-images";
import { PRODUCT_LABELS_1, PRODUCT_LABELS_2, PRODUCT_LABELS_3 } from "./product-labels";


export const PRODUCTS_NEW: ProductsBaseI[] = [
    {
        id: '1',
        created_at: "2021-11-14T17:44:08.052Z",
        title: "title 1",
        is_public: true,
        is_available: true,
        price: 50,
        images: PRODUCT_IMAGES_1,
        labels: PRODUCT_LABELS_1,
        rating: 0,
        description: "description text description text description text description text description text",
        comment: "comment text comment text comment textcomment textcomment textcomment text"
      },
      {
        id: '2',
        created_at: "2021-11-14T17:44:08.052Z",
        title: "title 2",
        is_public: true,
        is_available: true,
        price: 100,
        images: PRODUCT_IMAGES_2,
        labels: PRODUCT_LABELS_2,
        rating: 10,
        description: "description text description text description text description text description text",
        comment: "comment text comment text comment textcomment textcomment textcomment text"
      },
      {
        id: '3',
        created_at: "2021-11-14T17:44:08.052Z",
        title: "title 3",
        is_public: true,
        is_available: true,
        price: 200,
        images: PRODUCT_IMAGES_3,
        labels: PRODUCT_LABELS_3,
        rating: 20,
        description: "description text description text description text description text description text",
        comment: "comment text comment text comment textcomment textcomment textcomment text"
      },
      {
        id: '4',
        created_at: "2021-11-14T17:44:08.052Z",
        title: "title 4",
        is_public: true,
        is_available: true,
        price: 100,
        images: PRODUCT_IMAGES_2,
        labels: PRODUCT_LABELS_2,
        rating: 40,
        description: "description text description text description text description text description text",
        comment: "comment text comment text comment textcomment textcomment textcomment text"
      },
      {
        id: '5',
        created_at: "2021-11-14T17:44:08.052Z",
        title: "title 5",
        is_public: true,
        is_available: true,
        price: 300,
        images: PRODUCT_IMAGES_3,
        labels: PRODUCT_LABELS_3,
        rating: 30,
        description: "description text description text description text description text description text",
        comment: "comment text comment text comment textcomment textcomment textcomment text"
      },
      {
        id: '6',
        created_at: "2021-11-14T17:44:08.052Z",
        title: "title 6",
        is_public: true,
        is_available: true,
        price: 500,
        images: PRODUCT_IMAGES_2,
        labels: PRODUCT_LABELS_2,
        rating: 50,
        description: "description text description text description text description text description text",
        comment: "comment text comment text comment textcomment textcomment textcomment text"
      },
      {
        id: '7',
        created_at: "2021-11-14T17:44:08.052Z",
        title: "title 7",
        is_public: true,
        is_available: true,
        price: 70,
        images: PRODUCT_IMAGES_1,
        labels: PRODUCT_LABELS_1,
        rating: 0,
        description: "description text description text description text description text description text",
        comment: "comment text comment text comment textcomment textcomment textcomment text"
      },
    ]