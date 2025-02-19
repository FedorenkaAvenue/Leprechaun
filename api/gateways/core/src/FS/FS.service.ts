import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import {
    S3Client,
    PutObjectCommand,
    HeadBucketCommand,
    CreateBucketCommand,
    PutBucketPolicyCommand,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { extname } from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import ConfigService from '../config/config.service';
import { FSBucket } from './FS.enum';

@Injectable()
export default class FSService {
    private s3: S3Client;

    constructor(private readonly configService: ConfigService) {
        this.s3 = new S3Client(configService.getFSClient());
    }

    /**
     * @description check if bucket exists
     * @param {FSBucket} bucketName bucket name
     */
    private async ensureBucketExists(bucketName: FSBucket) {
        try {
            await this.s3.send(new HeadBucketCommand({ Bucket: bucketName }));
        } catch (error) {
            //@ts-ignore
            if (error.name === 'NotFound') {
                await this.s3.send(new CreateBucketCommand({ Bucket: bucketName }));
                await this.s3.send(new PutBucketPolicyCommand({
                    Bucket: bucketName,
                    Policy: JSON.stringify({
                        Version: "2012-10-17",
                        Statement: [
                            {
                                Effect: "Allow",
                                Principal: "*",
                                Action: ["s3:GetObject"],
                                Resource: [`arn:aws:s3:::${bucketName}/*`]
                            }
                        ]
                    })
                }));
            } else {
                throw error;
            }
        }
    }

    /**
  * @description method to filter file's extensions for MulterOptions
  * @param extentions spreaded extensions ('svg', 'png' etc)
  * @throws {BadRequestException} file extension doesn't exists
  */
    public static fileFilterOption(...extentions: string[]): MulterOptions['fileFilter'] {
        return function (_, { originalname }, cb) {
            try {
                extentions.forEach(ext => {
                    if (extname(originalname) !== `.${ext}`) throw Error;
                });
            } catch (err) {
                return cb(new BadRequestException(`file extention ${extentions.toString()} is not correct`), false);
            }

            cb(null, true);
        };
    }

    /**
     * @description save file
     * @param {Express.Multer.File} file
     * @param {FSBucket} bucket bucket name
     * @param {String} prefix file name prefix
     * @returns {Object} {
     *      id: 3S file id,
     *      url: file URL,
     *  }
     */
    public async uploadFile(
        file: Express.Multer.File, bucket: FSBucket, prefix: string | number,
    ): Promise<{ id: string, url: string }> {
        await this.ensureBucketExists(bucket);

        const filePath = `${String(prefix)}_${file.originalname}`;
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
                url: `${this.configService.getVal('DOMAIN_MEDIA')}/${bucket}/${filePath}`,
            };
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    public async deleteFile(bucketName: FSBucket, fileName: string) {
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
