import { DeepPartial } from "typeorm";

import { Product, ProductCU, ProductLabel, ProductLabelType, ProductPreview, ProductPreviewPublic, ProductQueryParams } from "gen/product";
import { ProductEntity } from "./product.entity";
import { Trans, TransData, TransMap } from "gen/trans";
import { CategoryPreview } from "gen/category_preview";
import { PropertyGroupPreview } from "gen/property_group";
import ProductImageMapper from "src/productImage/productImage.mapper";
import getPercentDifference from "@shared/utils/getPercentDifference";

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
    static toView(
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

    static toPreview(
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

    @WithLabels(ProductLabelType.DISCOUNT_LABEL)
    static toPreviewPublic(
        { rating, isPublic, comment, ...product }: ProductPreview,
        lang: keyof TransData,
    ): ProductPreviewPublic {
        return {
            ...Object.assign(product, this),
            title: product.title[lang],
            labels: [],
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

function WithLabels(...certainLabels: ProductLabelType[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const result = originalMethod.apply(this, args);
            const labels: ProductLabel[] = [];

            const {
                price: { old, current },
                isNew,
                rating,
            } = args[0] as ProductEntity;

            certainLabels.forEach(label => {
                switch (label) {
                    case ProductLabelType.DISCOUNT_LABEL: {
                        if (typeof old === 'number' && old > current) {
                            labels.push({
                                type: ProductLabelType.DISCOUNT_LABEL,
                                value: getPercentDifference(old, current),
                            });
                        }

                        break;
                    }

                    case ProductLabelType.POPULAR_LABEL: {
                        if (rating > 70) labels.push({ type: ProductLabelType.POPULAR_LABEL, value: 'популярнi' });

                        break;
                    }

                    case ProductLabelType.NEW_LABEL: {
                        if (isNew) labels.push({ type: ProductLabelType.NEW_LABEL, value: 'новинки' });

                        break;
                    }
                }
            });

            return { ...result, labels };
        };

        return descriptor;
    };
}
