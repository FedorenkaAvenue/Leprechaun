import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { catchError, forkJoin, from, lastValueFrom, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';

import { ProductEntity } from './product.entity';
import { Product, ProductCU, ProductPreview, ProductPreviewPublic, ProductQueryParams, ProductSort } from 'gen/product';
import { PaginationResult } from '@shared/dto/pagination.dto';
import ProductMapper from './product.mapper';
import { TransService } from '@common/trans/trans.service';
import S3Service from '@common/s3/s3.service';
import CategoryService from '@common/category/category.service';
import PropertyGroupService from '@common/propertyGroup/propertyGroup.service';
import { Category } from 'gen/category';
import { ProductUpdateDTO } from './product.dto';
import EventService from '@common/event/event.service';
import { TransData } from 'gen/trans';

@Injectable()
export default class ProductService {
    constructor(
        @InjectRepository(ProductEntity) protected readonly productRepo: Repository<ProductEntity>,
        private readonly transService: TransService,
        private readonly s3Service: S3Service,
        private readonly categoryService: CategoryService,
        private readonly propGroupService: PropertyGroupService,
        private readonly eventSerivice: EventService,
    ) { }

    public createProduct(newProduct: ProductCU): Observable<ProductPreview> {
        const images$ = newProduct.images ? from(this.s3Service.uploadProductImages(newProduct.images)) : of([]);

        return forkJoin([
            this.transService.createTrans(newProduct.title),
            this.transService.createTrans(newProduct.description),
            images$,
        ]).pipe(
            switchMap(([title, description, images]) => from(this.productRepo.save(
                ProductMapper.toEntity(
                    newProduct,
                    {
                        title: title.id,
                        description: description.id,
                        images,
                    }
                ))
            ).pipe(
                switchMap(product => this.getProductPreview(product.id))
            ))
        ).pipe(
            catchError(err => throwError(() => new RpcException(err)))
        );
    }

    private getProductPreview(id: Product['id']): Observable<ProductPreview> {
        return from(this.productRepo.findOneBy({ id })).pipe(
            switchMap(product => {
                if (!product) {
                    return throwError(() => new RpcException({
                        code: status.NOT_FOUND,
                        message: `product with id ${id} not found`
                    }));
                }

                return from(this.transService.getTransMap({ ids: [product.title, product.description] })).pipe(
                    map(transMap => ProductMapper.toPreview(product, transMap))
                );
            })
        )
    }

    public getProduct(id: Product['id']): Observable<Product> {
        return from(this.getProductQueryBulder()
            .andWhere('p.id = :id', { id })
            // .addSelect('p.orderCount')
            .getOne()
        ).pipe(
            switchMap(product => {
                if (!product) {
                    return throwError(() => new RpcException({
                        code: status.NOT_FOUND,
                        message: `product with id ${id} not found`
                    }));
                }

                const options$ = product.properties.length
                    ? this.propGroupService.getOptions(product.properties)
                    : of([]);

                return forkJoin([
                    this.transService.getTransMap({ ids: [product.title, product.description] }),
                    this.categoryService.getCategoryPreview(product.category),
                    options$,
                ]).pipe(
                    map(([transMap, category, options]) => ProductMapper.toView(
                        product, { transMap, category, options },
                    ))
                );
            })
        )
    }

    public async getProductList(searchParams: ProductQueryParams): Promise<PaginationResult<ProductPreview>> {
        const qb = this.getProductQueryBulder();
        const [products, totalCount] = await this.renderProductList<ProductPreview>(qb, searchParams, false);

        if (!products.length) return new PaginationResult<ProductPreview>([], { totalCount, currentPage: 0, itemPortion: 0 });

        const transMap = await lastValueFrom(this.transService.getTransMap({ ids: products.map((product) => product.title) }));

        return new PaginationResult<ProductPreview>(
            products.map((product) => ProductMapper.toPreview(product, transMap, searchParams)),
            {
                currentPage: searchParams.pagination.page,
                itemPortion: searchParams.pagination.portion,
                totalCount,
            },
        );
    }

    public getProductListByCategory(id: Category['id']): Observable<ProductPreview[]> {
        return from(this.productRepo.find({ where: { category: id } })).pipe(
            switchMap(products => {
                if (!products.length) return of([]);

                return from(this.transService.getTransMap({ ids: products.map((product) => product.title) })).pipe(
                    map(transMap => products.map((product) => ProductMapper.toPreview(product, transMap)))
                )
            })
        )
    }

    public getProductListByIdsPrivate(ids: Product['id'][]): Observable<ProductPreview[]> {
        return this.getProductListByIds(ids);
    }

    public getProductListByIdsPublic(ids: Product['id'][], lang: keyof TransData): Observable<ProductPreviewPublic[]> {
        return this.getProductListByIds(ids).pipe(
            map(products => products.map((product) => ProductMapper.toPreviewPublic(product, lang)))
        )
    }

    public updateProduct(productId: Product['id'], { images, ...updates }: ProductUpdateDTO): Observable<void> {
        return from(this.productRepo.update({ id: productId }, updates)).pipe(
            map(() => undefined),
        );
    }

    public deleteProduct(id: string): Observable<void> {
        return from(this.productRepo.findOne({
            where: { id },
            relations: { images: true },
            select: { images: { srcId: true } },
        })).pipe(
            switchMap(product => {
                if (!product) {
                    return throwError(() => new RpcException({
                        code: status.NOT_FOUND,
                        message: `product with id ${id} not found`,
                    }));
                }

                return from(this.productRepo.remove(product)).pipe(
                    tap(() => {
                        if (product.images.length) this.s3Service.deleteImages(product.images.map((image) => image.srcId))

                        this.eventSerivice.deleteProduct(product);
                    }),
                    map(() => undefined)
                );
            })
        );
    }

    private getProductListByIds(ids: Product['id'][]): Observable<ProductPreview[]> {
        return from(this.productRepo.find({ where: { id: In(ids) } })).pipe(
            switchMap(products => {
                if (!products.length) return of([]);

                return from(this.transService.getTransMap({ ids: products.map((product) => product.title) })).pipe(
                    map(transMap => products.map((product) => ProductMapper.toPreview(product, transMap)))
                )
            })
        )
    }

    /**
     * @description get common product query builder
     * @returns query builder
     */
    private getProductQueryBulder(): SelectQueryBuilder<ProductEntity> {
        return this.productRepo
            .createQueryBuilder('p')
            // .leftJoinAndSelect('p.title', 'title')
            .leftJoinAndSelect('p.images', 'images')
        // .leftJoinAndSelect('p.description', 'description')

        // .leftJoin('p.properties', 't_props')
        // .leftJoin('t_props.propertygroup', 't_pg')

        // .leftJoinAndMapMany('p.options', PropertyGroupEntity, 'pg', 't_pg.id = pg.id')
        // .leftJoinAndSelect('pg.title', 'pg_title')

        // .leftJoinAndSelect('pg.properties', 'props', 't_props.id = props.id')
        // .leftJoinAndSelect('props.title', 'props_title');
    }

    /**
     * @description render product search result with filters, sorting and pagination
     * @param qb query builder to continue building query
     * @param searchParams
     * @param resultMapConstructor constructor for maping result. by default will return ProductEntity
     * @param isPublic get only pablic data
     * @returns completed search result with pagination
     */
    private async renderProductList<T>(
        qb: SelectQueryBuilder<ProductEntity>,
        searchParams: ProductQueryParams,
        isPublic: boolean,
    ): Promise<[ProductEntity[], number]>;

    private async renderProductList(
        qb: SelectQueryBuilder<ProductEntity>,
        searchParams: ProductQueryParams,
        isPublic: boolean
    ): Promise<[ProductEntity[], number]>;

    private async renderProductList<T = ProductEntity>(
        qb: SelectQueryBuilder<ProductEntity>,
        searchParams: ProductQueryParams,
        isPublic: boolean,
    ): Promise<[ProductEntity[], number]> {
        const { pagination: { portion, page }, sort, price, status, category } = searchParams;

        // if (optionsFilter) {
        //     qb.andWhere('p.properties.alt_name = :value', { value: 'bavovna' }); // Example filter logic
        // }

        if (price) qb.andWhere('p.price.current BETWEEN :min AND :max', { ...price });

        if (category) {
            qb.leftJoin('p.category', 'cat').where('cat.id = :categoryId', { categoryId: category });

            if (isPublic) qb.andWhere('cat.is_public = true');
        }

        if (status) qb.andWhere('p.status = :status', { status });

        switch (sort) {
            case ProductSort.PRICE_UP_SORT:
                qb.orderBy('p.price.current', 'ASC');
                break;
            case ProductSort.PRICE_DOWN_SORT:
                qb.orderBy('p.price.current', 'DESC');
                break;
            case ProductSort.NEW_SORT:
                qb.orderBy('p.created_at', 'DESC');
                break;
            default: // ProductSort.POPULAR
                qb.orderBy('p.rating', 'DESC');
        }

        if (isPublic) qb.andWhere('p.is_public = true');

        return await qb
            .take(portion)
            .skip((page - 1) * portion)
            .getManyAndCount();
    }
}
