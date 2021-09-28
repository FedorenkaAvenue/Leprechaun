import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { promises } from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { extname } from 'path';

import ConfigService from '@services/Config';

const { HOSTING_PATH } = new ConfigService().getHostingParams();

export enum FOLDER_TYPES {
    CATEGORY = 'img/category/',
    PRODUCT = 'img/product/'
}

@Injectable()
export class MulterService implements MulterOptionsFactory {
    /**
     * @description method to filter file's extensions for MulterOptions
     * @param extentions spreaded extensions ('svg', 'png' etc)
    */
    public static fileFilterOption(...extentions: Array<string>): MulterOptions['fileFilter'] {
        return function(_, { originalname }, cb) {
            try {
                extentions.forEach(ext => {
                    if (extname(originalname) !== `.${ext}`) throw Error;
                });
            } catch(err) {
                return cb(new BadRequestException(), false);
            }

            cb(null, true);
        }
    }

    /**
     * @returns Multer settings object
     */
    createMulterOptions(): MulterModuleOptions {
        return {
            storage: memoryStorage()
        };
    }

    /**
     * @description save array of files
     * @param itemType folder type (with existing path)
     * @param folderId folder name
     * @param files array of binary files
     * @returns array of downloaded file paths
     */
    async saveFiles(
        itemType: FOLDER_TYPES,
        folderId: string | number,
        files: Array<Express.Multer.File>
    ): Promise<string[]> {
        const itemDirPath = `${HOSTING_PATH}/${itemType}/${folderId}`;
    
        try {
            await promises.mkdir(itemDirPath, { recursive: true });
    
            return await Promise.all(files.map(async ({ originalname, buffer }) => {
                const imageHref = `${itemType}${folderId}/${originalname}`;
    
                await promises.appendFile(`${HOSTING_PATH}/${imageHref}`, buffer);
    
                return imageHref;
            }));
        } catch(err) {
            throw new InternalServerErrorException();
        }
    }

    /**
     * @description remove one file
     * @param fileHref file path
     */
    async removeFiles(files: Array<string>): Promise<void> {
        try {
            await Promise.all(files.map(file => {
                return promises.rm(HOSTING_PATH + file);
            }));
        } catch(err) {
            throw new InternalServerErrorException();
        }
    }

    /**
     * @description force folder removing
     * @param folderType folder type (with existing path)
     * @param folderName folder name
     */
    async removeFolder(folderType: FOLDER_TYPES, folderName: string | number): Promise<void> {
        try {
            await promises.rmdir(
                `${HOSTING_PATH}${folderType}/${folderName}`,
                { recursive: true }
            );
        } catch(err) {
            throw new InternalServerErrorException();
        }
    }
}
