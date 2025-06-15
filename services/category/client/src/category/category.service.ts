import { Raw, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, forkJoin, from, lastValueFrom, map, Observable, of, switchMap, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import { Category, CategoryCU } from 'gen/category';
import CategoryEntity from './category.entity';
import { CategoryCreateDTO } from './category.dto';
import S3Service from '@common/s3/s3.service';
import { TransService } from '@common/trans/trans.service';
import CategoryMapper from './category.mapper';
import PropertyGroupService from '@common/propertyGroup/propertyGroup.service';
import { PropertyGroup } from 'gen/property_group';
import { CategoryPreview } from 'gen/category_preview';
import EventService from '@common/event/event.service';
import ProductService from '@common/product/product.service';

@Injectable()
export default class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepo: Repository<CategoryEntity>,
        private readonly s3Service: S3Service,
        private readonly transService: TransService,
        private readonly propertyGroupService: PropertyGroupService,
        private readonly eventService: EventService,
        private readonly productService: ProductService,
    ) { }

    public getCategoryList(): Observable<CategoryPreview[]> {
        return from(this.categoryRepo.find({ order: { createdAt: 'DESC' } })).pipe(
            switchMap(categories => {
                if (!categories.length) return of([]);

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

        if (icon) iconData = await this.s3Service.uploadCategoryIcon(icon, newCategory.url);

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

    public getCategory(id?: Category['id'], url?: Category['url']): Observable<Category> {
        return from(this.categoryRepo.findOne({ where: { url, id } })).pipe(
            switchMap(category => {
                if (!category) {
                    return throwError(() =>
                        new RpcException({
                            message: `category with id ${id} not found`,
                            code: status.NOT_FOUND,
                        })
                    );
                }

                const propGroups$ = category.propertyGroups?.length
                    ? this.propertyGroupService.getGroupListPrivate({ ids: category.propertyGroups })
                    : of(undefined);

                return forkJoin([
                    this.transService.getTransMap({ ids: [category.title] }),
                    this.productService.getProductListByCategory(category.id),
                    propGroups$,
                ]).pipe(
                    map(([transMap, products, propGroups]) => CategoryMapper.toView(
                        category,
                        {
                            transMap: transMap.items,
                            propertyGroups: propGroups?.items,
                            products,
                        },
                    ))
                )
            }),
        );
    }

    public getCategoryPreview(id?: Category['id'], url?: Category['url']): Observable<CategoryPreview> {
        return from(this.categoryRepo.findOne({ where: { url, id } })).pipe(
            switchMap(category => {
                if (!category) {
                    return throwError(() =>
                        new RpcException({
                            message: `category with id ${id} not found`,
                            code: status.NOT_FOUND,
                        })
                    );
                }

                return this.transService.getTransMap({ ids: [category.title] }).pipe(
                    map(transMap => CategoryMapper.toPreview(category, transMap.items))
                );
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
                if (!categories.length) return of([]);

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

    public async deleteCategory(id: Category['id']): Promise<void> {
        const category = await this.categoryRepo.findOne({ where: { id } });

        if (!category) throw new RpcException({ code: status.NOT_FOUND, message: `category with id ${id} not found` });

        await this.categoryRepo.delete({ id });

        if (category?.iconId) this.s3Service.deleteCategoryIcon(category.iconId);

        this.eventService.deleteCategory(category);
    }

    /**
     * @description remove property group from category.propertyGroups.
     * triggers by 'propgroup.delete' event
     */
    public async removePropertyGroup(id: PropertyGroup['id']): Promise<UpdateResult> {
        return await this.categoryRepo
            .createQueryBuilder()
            .update(CategoryEntity)
            .set({
                propertyGroups: () => `array_remove(propertyGroups, ${id})`,
            })
            .where(`propertyGroups @> ARRAY[${id}]`)
            .execute();
    }
}
