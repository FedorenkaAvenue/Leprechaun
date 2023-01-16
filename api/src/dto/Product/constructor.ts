import { PriceI } from '@interfaces/Price';
import { ProductStatusE } from '@enums/Product';
import WithLabels from '@decorators/Label';
import { LabelType } from '@enums/Label';
import { ImageEntity } from '@entities/Image';
import { CreateProductDTO, ProductPreviewDTO, ProductCardDTO, ProductPublicDTO, ProductSearchDTO } from '.';
import { Price } from '@dto/Price/constructor';
import configService from '@services/Config';
import { PropertyPublic } from '@dto/Property/constructor';
import { ProductEntity } from '@entities/Product';
import { CategoryPublic } from '@dto/Category/constructor';
import { QueriesProductListI } from '@interfaces/Queries';
import { QueriesCommon } from '@dto/Queries/constructor';

const PRODUCT_PUBLIC_IMAGE_AMOUNT = configService.getVal('PRODUCT_PUBLIC_IMAGE_AMOUNT');

export class Product extends CreateProductDTO {
    price: PriceI;

    constructor({
        title,
        price_current,
        price_old,
        is_public,
        category,
        properties,
        status,
        description,
        comment,
        is_new,
        rating,
    }: CreateProductDTO) {
        super();
        this.title = title;
        this.price = new Price({ current: price_current, old: price_old });
        this.is_public = ((<unknown>is_public) as string) === 'true';
        this.status = status || ProductStatusE.AVAILABLE;
        this.rating = rating || 0;
        this.is_new = typeof is_new === 'boolean' ? is_new : true;
        this.category = category;
        this.description = description || null;
        this.comment = comment || null;
        // TODO
        // @ts-ignore for properties relation
        this.properties = properties ? properties.map(property => ({ id: Number(property) })) : [];
    }
}

@WithLabels(LabelType.DISCOUNT)
export class ProductPreview extends ProductPreviewDTO {
    constructor({ id, title, price, status, images }: ProductEntity, { lang }: QueriesCommon) {
        super();
        this.id = id;
        this.title = title[lang];
        this.price = price;
        this.status = status;
        this.image = (images[0] as ImageEntity).src;
    }
}

@WithLabels(LabelType.NEW, LabelType.POPULAR, LabelType.DISCOUNT)
export class ProductCard extends ProductCardDTO {
    constructor({ id, title, price, status, images, properties }: ProductEntity, searchParams: QueriesCommon) {
        super();
        this.id = id;
        this.title = title[searchParams.lang];
        this.price = price;
        this.status = status;
        this.images = images.slice(0, Number(PRODUCT_PUBLIC_IMAGE_AMOUNT)) as ImageEntity[];
        this.properties = properties
            .filter(({ propertygroup: { is_primary } }) => is_primary)
            .map(prop => new PropertyPublic(prop, searchParams));
    }
}

@WithLabels(LabelType.NEW, LabelType.POPULAR, LabelType.DISCOUNT)
export class ProductPublic extends ProductPublicDTO {
    options: any;

    constructor(
        { id, title, price, status, images, properties, category, wishlistCount, orderCount }: ProductEntity,
        searchParams: QueriesProductListI,
    ) {
        super();
        this.id = id;
        this.title = title[searchParams.lang];
        this.price = price;
        this.status = status;
        this.images = images.slice(0, Number(PRODUCT_PUBLIC_IMAGE_AMOUNT)) as ImageEntity[];
        this.properties = properties.map(prop => new PropertyPublic(prop, searchParams));
        this.category = new CategoryPublic(category, searchParams);
        this.orderCount = orderCount;
        this.wishlistCount = wishlistCount.length;
        // this.options = mapOptions(properties, searchParams);
    }
}

export class ProductSearch extends ProductSearchDTO {
    constructor({ p_id, title_en, img }) {
        super();
        this.id = p_id;
        this.title = title_en;
        this.image = img;
    }
}

// function mapOptions(properties: PropertyEntity[], searchParams: QueriesProductListI) {
//     return properties.reduce((acc, curr) => {
//         const { propertygroup, ...prop } = curr;

//         const existedGroupIndex = acc.findIndex((opt, i) => opt.propertyGroup.id === propertygroup.id);

//         if (existedGroupIndex !== -1) {
//             acc[existedGroupIndex].properties = [
//                 ...acc[existedGroupIndex].properties,
//                 //@ts-ignore
//                 new PropertyGroupPublic(prop, searchParams),
//             ];
//             return acc;
//         }
//         return [
//             ...acc,
//             {
//                 propertyGroup: new PropertyGroupPublic(propertygroup, searchParams),
//                 //@ts-ignore
//                 properties: [new PropertyPublic(prop, searchParams)],
//             },
//         ];
//     }, []);
// }
