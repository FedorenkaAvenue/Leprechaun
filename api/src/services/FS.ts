import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { promises } from 'fs';
import { extname } from 'path';

import configService from '@services/Config';
import { genUUID } from '@utils/genIds';

export enum FOLDER_TYPES {
    CATEGORY = 'img/category/',
    PRODUCT = 'img/product/',
}

/**
 * @description file system service
 */
@Injectable()
export class FSService implements MulterOptionsFactory {
    hostingPath: string;

    constructor() {
        this.hostingPath = configService.getHostingParams().HOSTING_PATH;
    }

    /**
     * @description method to filter file's extensions for MulterOptions
     * @param extentions spreaded extensions ('svg', 'png' etc)
     */
    public static fileFilterOption(...extentions: Array<string>): MulterOptions['fileFilter'] {
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
     * @returns Multer settings object
     */
    createMulterOptions(): MulterModuleOptions {
        return { storage: memoryStorage() };
    }

    /**
     * @description save array of files with hashing filenames
     * @param itemType folder type (with existing path)
     * @param folderId folder name
     * @param files array of binary files
     * @returns array of downloaded file paths
     */
    async saveFiles(
        itemType: FOLDER_TYPES,
        folderId: string | number,
        files: Array<Express.Multer.File>,
    ): Promise<string[]> {
        const itemDirPath = `${this.hostingPath}/${itemType}/${folderId}`;

        try {
            await promises.mkdir(itemDirPath, { recursive: true });

            return await Promise.all(
                files.map(async ({ originalname, buffer }) => {
                    const newFileName = genUUID() + extname(originalname);
                    const imageHref = `${itemType}${folderId}/${newFileName}`;

                    await promises.appendFile(`${this.hostingPath}/${imageHref}`, buffer);

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
     */
    async removeFiles(files: Array<string>): Promise<void> {
        try {
            await Promise.all(
                files.map(file => {
                    return promises.rm(this.hostingPath + file);
                }),
            );
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    /**
     * @description force folder removing
     * @param folderType folder type (with existing path)
     * @param folderName folder name
     */
    async removeFolder(folderType: FOLDER_TYPES, folderName: string | number): Promise<void> {
        try {
            await promises.rm(`${this.hostingPath}${folderType}/${folderName}`, { recursive: true });
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
