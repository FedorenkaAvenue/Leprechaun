import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { promises } from 'fs';

export enum FOLDER_TYPES {
    CATEGORY = '/category',
    PRODUCT = '/product'
}

@Injectable()
export class MulterService implements MulterOptionsFactory {
    private static IMAGE_HOSTING_FOLDER = '/var/www/img';

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: memoryStorage()
        };
    }

    async saveFiles(
        itemType: FOLDER_TYPES,
        folderId: string,
        files: Array<Express.Multer.File>
    ): Promise<string[]> {
        const itemDirPath = `${MulterService.IMAGE_HOSTING_FOLDER}/${itemType}/${folderId}`;
    
        try {
            await promises.mkdir(itemDirPath, { recursive: true });
    
            return await Promise.all(files.map(async ({ originalname, buffer }) => {
                const imageHref = `${itemType}/${folderId}/${originalname}`;
    
                await promises.appendFile(`${MulterService.IMAGE_HOSTING_FOLDER}/${imageHref}`, buffer);
    
                return `/img${imageHref}`;
            }));
        } catch(err) {
            throw new InternalServerErrorException();
        }
    }

    async removeFile(imgName: string): Promise<void> {
        try {
            await promises.rm(MulterService.IMAGE_HOSTING_FOLDER + imgName.replace('/img', ''));
        } catch(err) {
            throw new InternalServerErrorException();
        }
    }

    async removeFolder(folderType: FOLDER_TYPES, folderName: string): Promise<void> {
        try {
            await promises.rmdir(
                MulterService.IMAGE_HOSTING_FOLDER + folderType + folderName,
                { recursive: true }
            );
        } catch(err) {
            throw new InternalServerErrorException();
        }
    }
}
