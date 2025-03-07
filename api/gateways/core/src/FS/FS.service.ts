import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
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

    /**
     * @description remove files from bucket
     * @param {FSBucket} bucketName 
     * @param {String} fileName
     */
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
