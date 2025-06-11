import { Raw, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, forkJoin, from, lastValueFrom, map, Observable, of, switchMap, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import { Category, CategoryCU } from 'gen/ts/category';
import CategoryEntity from './category.entity';
import { CategoryCreateDTO } from './category.dto';
import S3Service from '@common/s3/s3.service';
import { S3Bucket } from '@common/s3/s3.enum';
import TransService from '@common/trans/trans.service';
import CategoryMapper from './category.mapper';
import PropertyGroupService from '@common/propertyGroup/propertyGroup.service';
import { PropertyGroup } from 'gen/ts/prop_group';
import { CategoryPreview } from 'gen/ts/category_preview';

@Injectable()
export default class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepo: Repository<CategoryEntity>,
        private readonly s3Service: S3Service,
        private readonly transService: TransService,
        private readonly propertyGroupService: PropertyGroupService,
    ) { }

    public getCategoryList(): Observable<CategoryPreview[]> {
        return from(this.categoryRepo.find({ order: { createdAt: 'DESC' } })).pipe(
            switchMap(categories => {
                if (!categories.length) return [];

                return from(
                    this.transService.getTransMap({ ids: categories.map(cat => cat.title) })
                ).pipe(
                    map(transMap => categories.map(cat => CategoryMapper.toPreview(cat, transMap.items)))
                )
            })
        );
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

    public getCategory(categoryUrl: Category['url']): Observable<Category> {
        return from(this.categoryRepo.findOne({
            where: { url: categoryUrl },
        })).pipe(
            switchMap(category => {
                if (!category) {
                    return throwError(() =>
                        new RpcException({
                            message: `category with url ${categoryUrl} not found`,
                            code: status.NOT_FOUND,
                        })
                    );
                }

                const transMap$ = this.transService.getTransMap({ ids: [category.title] });
                const propGroups$ = category.propertyGroups?.length
                    ? this.propertyGroupService.getGroupListPrivate({ ids: category.propertyGroups })
                    : of(undefined);

                return forkJoin([transMap$, propGroups$]).pipe(
                    map(([transMap, propGroups]) => CategoryMapper.toView(category, transMap.items, propGroups?.items))
                )
            }),
        );
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

    public getCategoryListByPropertyGroups(propertyGroupId: PropertyGroup['id']): Observable<CategoryPreview[]> {
        return from(
            this.categoryRepo.find({
                where: {
                    propertyGroups: Raw(alias => `:id = ANY(${alias})`, { id: propertyGroupId }),
                },
            })
        ).pipe(
            switchMap(categories => {
                if (!categories.length) {
                    return of([]); // повертаємо порожній масив, як у оригіналі
                }

                return this.transService.getTransMap({
                    ids: categories.map(cat => cat.title),
                }).pipe(
                    map(titleMap =>
                        categories.map(cat =>
                            CategoryMapper.toPreview(cat, titleMap.items)
                        )
                    )
                );
            })
        );
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
