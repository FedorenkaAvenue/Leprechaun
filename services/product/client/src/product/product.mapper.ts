import { DeepPartial } from "typeorm";
import { QueryCommonParams } from "@fedorenkaavenue/leprechaun_lib_entities/server/common";
import { Trans, TransData, TransMap } from "@fedorenkaavenue/leprechaun_lib_entities/server/trans";
import { CategoryPreview } from "@fedorenkaavenue/leprechaun_lib_entities/server/_category_preview";
import {
    PropertyGroupPreview, PropertyGroupPreviewPublic,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/property_group";
import {
    Product,
    ProductCardPublic,
    ProductCU,
    ProductLabel,
    ProductLabelType,
    ProductPreview,
    ProductPreviewPublic,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/product";

import { ProductEntity } from "./product.entity";
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
        product: ProductEntity,
        { transMap, category, options }: ProductPrivatePayload,
    ): Product {
        return {
            ...product, category, options,
            title: transMap.items[product.title],
            description: transMap.items[product.description],
            images: product.images.map(ProductImageMapper.toView),
        }
    }

    static toPreview(
        product: ProductEntity,
        transMap: TransMap,
    ): ProductPreview {
        return {
            ...product,
            image: product.images.length ? ProductImageMapper.toView(product.images[0]) : undefined,
            title: transMap.items[product.title],
        }
    }

    @WithLabels(ProductLabelType.DISCOUNT_LABEL)
    static toPreviewPublic(
        { id, status, price, image, title }: ProductPreview,
        { lang }: QueryCommonParams,
    ): ProductPreviewPublic {
        return {
            id, status, price, image,
            title: title[lang as keyof TransData],
            labels: [],
        }
    }

    @WithLabels(ProductLabelType.DISCOUNT_LABEL, ProductLabelType.POPULAR_LABEL, ProductLabelType.NEW_LABEL)
    static toCardPublic(
        { id, status, price, ...product }: ProductEntity,
        transMap: TransMap,
        options: PropertyGroupPreviewPublic[],
        { lang }: QueryCommonParams,
    ): ProductCardPublic {
        return {
            id, status, price, options,
            title: transMap.items[product.title][lang as keyof TransData],
            description: transMap.items[product.description][lang as keyof TransData],
            images: product.images.map(ProductImageMapper.toView),
            labels: [],
        };
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
