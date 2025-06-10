import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

import ConfigService from '../config/config.service';
import { S3Bucket } from './s3.enum';
import { File } from 'gen/ts/common';

@Injectable()
export default class S3Service {
    private s3: S3Client;

    constructor(private readonly configService: ConfigService) {
        this.s3 = new S3Client(configService.getFSClient());
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
    public async uploadFile(
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
    public async deleteFile(bucketName: S3Bucket, fileName: string) {
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
