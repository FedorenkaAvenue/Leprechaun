import { ApiProperty } from '@nestjs/swagger';

import { ProductStatusE } from '@enums/Product';
import WithLabels from '@decorators/Label';
import { LabelType } from '@enums/Label';
import { ImageEntity } from '@entities/Image';
import { singleConfigService } from '@services/Config';
import { ProductEntity } from '@entities/Product';
import { QueriesProductListI } from '@interfaces/Queries';
import { QueriesCommon } from '@dto/Queries';
import { PriceEntity } from '@entities/_Price';
import { LabelI } from '@interfaces/Label';
import { Label } from '@dto/Label/constructor';
import { ProductPublicBaseI } from '@interfaces/Product';
import { ProductPreviewPublicI, ProductPublicI } from '@interfaces/Product';
import { ProductCardPublicI } from '@interfaces/Product';
import { OptionPublic } from '@dto/PropertyGroup/private';
import { CategoryPublic } from '@dto/Category/public';

const PRODUCT_PUBLIC_IMAGE_AMOUNT = singleConfigService.getVal('PRODUCT_PUBLIC_IMAGE_AMOUNT');

class Base implements ProductPublicBaseI {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ enum: ProductStatusE })
    status: ProductStatusE;

    @ApiProperty({ type: PriceEntity })
    price: PriceEntity;

    @ApiProperty({ type: Label, isArray: true })
    labels: LabelI[];

    constructor({
        id, title, price, status,
    }: Pick<ProductEntity, 'id' | 'title' | 'price' | 'status'>, lang: QueriesCommon['lang']) {
        this.id = id;
        this.title = title[lang];
        this.price = price;
        this.status = status;
    }
}

@WithLabels(LabelType.DISCOUNT)
export class ProductPreviewPublic extends Base implements ProductPreviewPublicI {
    @ApiProperty()
    image: string;

    constructor({ images, ...base }: ProductEntity, lang: QueriesCommon['lang']) {
        super(base, lang);
        this.image = images.find(({ is_main }) => is_main).src;
    }
}

@WithLabels(LabelType.NEW, LabelType.POPULAR, LabelType.DISCOUNT)
export class ProductCardPublic extends Base implements ProductCardPublicI {
    @ApiProperty({ type: ImageEntity, isArray: true })
    images: ImageEntity[];

    @ApiProperty({ description: 'mapped properties (into property groups)', isArray: true })
    options: OptionPublic[];

    @ApiProperty()
    description: string;

    constructor({ images, options, description, ...base }: ProductEntity, { lang }: QueriesCommon) {
        super(base, lang);
        this.images = images?.
            sort(({ is_main }) => is_main ? -1 : 1).
            slice(0, Number(PRODUCT_PUBLIC_IMAGE_AMOUNT)) as ImageEntity[];
        this.options = options.filter(({ is_primary }) => is_primary).map(opt => new OptionPublic(opt, lang));
        this.description = description?.[lang];
    }
}

@WithLabels(LabelType.NEW, LabelType.POPULAR, LabelType.DISCOUNT)
export class ProductPublic extends Base implements ProductPublicI {
    @ApiProperty({ type: ImageEntity, isArray: true })
    images: ImageEntity[];

    @ApiProperty({ description: 'mapped properties (into property groups)', isArray: true })
    options: OptionPublic[];

    @ApiProperty()
    description: string;

    @ApiProperty({ type: CategoryPublic })
    category: CategoryPublic;

    @ApiProperty({ description: 'how many users ordered this product' })
    orderCount: number;

    // @ApiProperty({ description: 'how many users added this product to wishlist' })
    // wishlistCount: number;

    constructor(
        { category, images, orderCount, description, options, ...base }: ProductEntity,
        { lang }: QueriesProductListI,
    ) {
        super(base, lang);
        this.description = description?.[lang];
        this.images = images?.slice(0, Number(PRODUCT_PUBLIC_IMAGE_AMOUNT)) as ImageEntity[];
        this.category = new CategoryPublic(category, lang);
        this.orderCount = orderCount;
        this.options = options.map(opt => new OptionPublic(opt, lang));
        // this.wishlistCount = wishlistCount.length;
    }
}
