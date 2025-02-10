import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { promises } from 'fs';
import { extname } from 'path';

import { FOLDER_TYPES } from './FS.enum';
import ConfigService from '../config/config.service';
import { genUUID } from '@shared/utils/genIds';

/**
 * @description file system service
 */
@Injectable()
export default class FSService {
    constructor(
        private readonly configService: ConfigService
    ) { }

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
                return cb(new BadRequestException(), false);
            }

            cb(null, true);
        };
    }

    /**
     * @description save array of files with hashing filenames
     * @param itemType folder type (with existing path)
     * @param folderId folder name
     * @param files array of binary files
     * @returns array of downloaded file paths
     * @throws {BadRequestException} unknown
     */
    public async saveFiles(
        itemType: FOLDER_TYPES,
        folderId: string | number,
        files: Express.Multer.File[],
    ): Promise<string[]> {
        const itemDirPath = `${this.configService.getHostingParams().HOSTING_PATH}/${itemType}/${folderId}`;

        try {
            await promises.mkdir(itemDirPath, { recursive: true });

            return await Promise.all(
                files.map(async ({ originalname, buffer }) => {
                    const newFileName = genUUID() + extname(originalname);
                    const imageHref = `${itemType}${folderId}/${newFileName}`;

                    await promises.appendFile(`${this.configService.getHostingParams().HOSTING_PATH}/${imageHref}`, buffer);

                    return imageHref;
                }),
            );
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    /**
     * @description remove one file
     * @param fileHref file path
     * @throws {InternalServerErrorException} unknown
     */
    public async removeFiles(files: string[]): Promise<void> {
        try {
            await Promise.all(files.map(file => promises.rm(this.configService.getHostingParams().HOSTING_PATH + file)));
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    /**
     * @description force folder removing
     * @param folderType folder type (with existing path)
     * @param folderName folder name
     * @throws {InternalServerErrorException} unknown
     */
    public async removeFolder(folderType: FOLDER_TYPES, folderName: string | number): Promise<void> {
        try {
            await promises.rm(`${this.configService.getHostingParams()}${folderType}/${folderName}`, { recursive: true });
        } catch (err) { }
    }
}
