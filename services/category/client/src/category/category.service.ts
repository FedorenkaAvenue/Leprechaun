import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, lastValueFrom, map, switchMap, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import { Category, CategoryCU, CategoryPreview } from 'gen/ts/category';
import CategoryEntity from './category.entity';
import { CategoryCreateDTO } from './category.dto';
import S3Service from '@common/s3/s3.service';
import { S3Bucket } from '@common/s3/s3.enum';
import TransService from '@common/trans/trans.service';
import CategoryMapper from './category.mapper';
import PropertyGroupService from '@common/propertyGroup/propertyGroup.service';

@Injectable()
export default class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepo: Repository<CategoryEntity>,
        private readonly s3Service: S3Service,
        private readonly transService: TransService,
        private readonly propertyGroupService: PropertyGroupService,
    ) { }

    public async getCategoryList(): Promise<CategoryPreview[]> {
        const categories = await this.categoryRepo.find({ order: { createdAt: 'DESC' } });

        if (!categories.length) return [];

        const { items: transMap } = await lastValueFrom(
            this.transService.getTransMap({ ids: categories.map(cat => cat.title) })
        );

        return categories.map(cat => CategoryMapper.toPreview(cat, transMap));
    }

    public async createCategory({ icon, ...newCategory }: CategoryCreateDTO): Promise<CategoryPreview> {
        let iconData: Awaited<ReturnType<S3Service['uploadFile']>> | undefined;

        if (icon) iconData = await this.s3Service.uploadFile(icon, S3Bucket.CATEGORY_ICONS, newCategory.url);

        return lastValueFrom(this.transService.createTrans(newCategory.title).pipe(
            switchMap(titleTrans => from(this.categoryRepo.save({
                ...newCategory,
                icon: iconData?.url,
                iconId: iconData?.id,
                title: titleTrans.id,
            })).pipe(
                map(cat => ({ ...cat, title: titleTrans.data })),
                catchError(err => {
                    this.transService.deleteTrans({ id: titleTrans.id });

                    return throwError(() => {
                        return err.code == 23505
                            ? new RpcException({
                                code: status.ALREADY_EXISTS,
                                message: `category with url "${newCategory.url}" already exist`,
                            })
                            : new RpcException(err)
                    });
                }),
            )),
            catchError(err => throwError(() => new RpcException(err))),
        ));
    }

    public async getCategory(categoryUrl: Category['url']): Promise<Category> {
        const category = await this.categoryRepo.findOne({
            where: { url: categoryUrl },
        });

        if (!category) {
            throw new RpcException({ message: `category with url ${categoryUrl} not found`, code: status.NOT_FOUND });
        }

        const [transMap, propGroups] = await Promise.all([
            lastValueFrom(
                this.transService.getTransMap({ ids: [category.title] })
            ),
            lastValueFrom(
                this.propertyGroupService.getPropertyGroupList({ ids: category.propertyGroups })
            )
        ]);

        return CategoryMapper.toView(category, transMap.items, propGroups.items);
    }

    public async updateCategory(id: Category['id'], { title, icon, ...updates }: CategoryCU): Promise<void> {
        const category = await this.categoryRepo.findOne({
            where: { id },
        });

        if (!category) {
            throw new RpcException({
                code: status.NOT_FOUND,
                message: `category with id ${id} not found`
            });
        }

        await this.categoryRepo.update({ id }, updates);

        if (title) await lastValueFrom(this.transService.updateTrans({ id: category.title, data: title }));
    }

    // public async deleteCategory(id: CategoryI['id']): Promise<DeleteResult> {
    //     const category = await this.categoryRepo.findOne({
    //         where: { id },
    //         select: { id: true, icon_id: true },
    //     });

    //     const res = await this.categoryRepo.delete({ id });

    //     if (category?.icon_id) await this.FSService.deleteFile(FSBucket.CATEGORY, category.icon_id);

    //     return res;
    // }
}
