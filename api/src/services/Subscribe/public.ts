import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";

import SubscribeProductEntity from "@entities/SubscribeProduct";
import { SubscribeProductStatusDTO } from "@dto/Subscribe/public";
import { SessionI } from "@interfaces/Session";
import { ProductStatusSubscriptionI, SubscribeProductI } from "@interfaces/Subscribe";
import MailPublicService from "@services/Mail/public";
import renderTemplate from "@utils/renderTemplate";
import { ProductPreviewPublic } from "@dto/Product/public";
import { QueriesCommonI } from "@interfaces/Queries";
import { ProductI } from "@interfaces/Product";

@Injectable()
export default class SubscribePublicService {
    constructor(
        @InjectRepository(SubscribeProductEntity) private readonly subscribeProductRepo: Repository<SubscribeProductEntity>,
        private readonly mailPublicService: MailPublicService,
        // private readonly productService: ProductService,
    ) { }

    public async getProductStatusSubscriptions(sid: SessionI['sid']): Promise<ProductStatusSubscriptionI[]> {
        const subscriptions = await this.subscribeProductRepo.find(
            {
                where: { sid },
                relations: { product: true },
            });

        return subscriptions.map(({ product: { id } }) => id);
    }

    public async subscribeProductStatus(
        { productId, email }: SubscribeProductStatusDTO, sid: SessionI['sid'], { lang }: QueriesCommonI,
    ): Promise<void> {
        const { raw } = await this.subscribeProductRepo.upsert(
            { product: productId, email, sid, lang } as DeepPartial<SubscribeProductI>,
            {
                conflictPaths: { product: true, email: true },
                skipUpdateIfNoValuesChanged: true,
            },
        )

        if (raw.length === 0) throw new NotAcceptableException('this email already subscribed on this product');
    }

    // TODO email lang
    public async notifyProductAvailableStatus(product: ProductI): Promise<void> {
        //@ts-ignore
        const subscribers = await this.subscribeProductRepo.find({ product: product.id });

        if (!subscribers.length) return;

        this.mailPublicService.sendMail({
            to: subscribers.map(({ email }) => email),
            html: renderTemplate(
                'public/productStatusAvailable',
                { product: new ProductPreviewPublic(product, 'ua') },
            ),
        });
    }
}
