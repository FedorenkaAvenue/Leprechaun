import { DeepPartial } from "typeorm";

import { Product, ProductCU, ProductPreview, ProductQueryParams } from "gen/product";
import { ProductEntity } from "./product.entity";
import { Trans, TransMap } from "gen/trans";
import { CategoryPreview } from "gen/category_preview";
import { PropertyGroupPreview } from "gen/property_group";
import ProductImageMapper from "src/productImage/productImage.mapper";

interface ProductCUPayload {
    title: Trans['id'];
    description: Trans['id'];
    images: any[];
}

interface ProductPrivatePayload {
    transMap: TransMap,
    category: CategoryPreview,
    options: PropertyGroupPreview[],
}

export default class ProductMapper {
    static toPrivateView(
        { properties, ...product }: ProductEntity,
        { transMap, category, options }: ProductPrivatePayload,
    ): Product {
        return {
            ...Object.assign(product, this),
            title: transMap.items[product.title],
            description: transMap.items[product.description],
            images: product.images.map(ProductImageMapper.toView),
            category,
            options,
        }
    }

    static toPrivatePreview(
        product: ProductEntity,
        transMap: TransMap,
        searchParams?: ProductQueryParams,
    ): ProductPreview {
        return {
            ...Object.assign(product, this),
            image: product.images.length ? `http://localhost:9013${product.images[0].src}` : undefined,
            title: transMap.items[product.title],
        }
    }

    static toEntity(
        newProduct: ProductCU,
        { title, description, images }: ProductCUPayload,
    ): DeepPartial<ProductEntity> {
        return {
            ...Object.assign(newProduct, this),
            title,
            description,
            price: { current: newProduct.priceCurrent, old: newProduct.priceOld },
            images: images.map(ProductImageMapper.toEntity),
        };
    }
}
