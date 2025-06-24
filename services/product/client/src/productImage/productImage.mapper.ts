import { DeepPartial } from "typeorm";

import { Image } from "gen/common";
import { ProductImage } from "gen/product";
import S3Service from "@common/s3/s3.service";

type ImageCUPayload = Awaited<ReturnType<S3Service['uploadFile']>>

export default class ProductImageMapper {
    static toView({ id, src }: ProductImage): Image {
        return {
            id,
            src: `http://host.docker.internal:9013${src}`,
        };
    }

    static toEntity({ id, url }: ImageCUPayload, index: number): DeepPartial<ProductImage> {
        return {
            src: url,
            isMain: index === 0,
            srcId: id,
        };
    }
}
