import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import SubscribeProductEntity from "./subscribeProduct.entity";
import { ProductI } from "../product/product.interface";
import MailService from '@shared/modules/mail/mail.service';
import renderTemplate from "@shared/utils/renderTemplate";

@Injectable()
export default class SubscribeProductService {
    constructor(
        @InjectRepository(SubscribeProductEntity) private readonly subscribeProductRepo: Repository<SubscribeProductEntity>,
        private readonly mailPublicService: MailService,
    ) { }

    // TODO email lang
    public async notifyProductAvailableStatus(product: ProductI): Promise<void> {
        //@ts-ignore
        const subscribers = await this.subscribeProductRepo.find({ product: product.id });

        if (!subscribers.length) return;

        this.mailPublicService.sendMail({
            to: subscribers.map(({ email }) => email),
            html: renderTemplate(
                'public/productStatusAvailable',
                // { product: new ProductPreviewPublic(product, 'ua') },
            ),
        });
    }
}
