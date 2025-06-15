import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import ConfigService from '../config/config.service';
import { S3Bucket } from './s3.enum';
import { File } from 'gen/common';

@Injectable()
export default class S3Service {
    private s3: S3Client;

    constructor(private readonly configService: ConfigService) {
        this.s3 = new S3Client(configService.getFSClient());
    }

    public async uploadProductImages(images: File[]): Promise<{ id: string, url: string }[]> {
        return Promise.all(images.map((image) => this.uploadFile(image, S3Bucket.PRODUCT_IMAGE, 1)));
    }

    public async deleteImages(images: string[]): Promise<void[]> {
        return Promise.all(images.map(image => this.deleteFile(S3Bucket.PRODUCT_IMAGE, image)))
            .catch(err => {
                throw new RpcException({
                    code: status.INTERNAL,
                    message: `Error during deleting ${images} from S3: ${err}`,
                });
            });
    }

    /**
     * @description save file
     * @param {Express.Multer.File} file
     * @param {S3Bucket} bucket bucket name
     * @param {String} prefix file name prefix
     * @returns {Object} {
     *      id: 3S file id,
     *      url: file URL,
     *  }
     */
    private async uploadFile(
        file: File, bucket: S3Bucket, prefix: string | number,
    ): Promise<{ id: string, url: string }> {
        const filePath = `${String(prefix)}.${file.originalname}`;
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: filePath,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        });

        try {
            await this.s3.send(command);

            return {
                id: filePath,
                url: `/${bucket}/${filePath}`,
            };
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    /**
     * @description remove files from bucket
     * @param {FSBucket} bucketName 
     * @param {String} fileName
     */
    private async deleteFile(bucketName: S3Bucket, fileName: string) {
        try {
            await this.s3.send(new DeleteObjectCommand({ Bucket: bucketName, Key: fileName }));
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    // public async getFileUrl(fileName: string) {
    //     const command = new GetObjectCommand({
    //         Bucket: this.bucketName,
    //         Key: fileName,
    //     });

    //     return await getSignedUrl(this.s3, command, { expiresIn: 3600 }); // URL на 1 час
    // }
}
