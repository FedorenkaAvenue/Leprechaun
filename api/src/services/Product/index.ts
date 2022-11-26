import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { FSService } from '@services/FS';
import { ProductEntity } from '@entities/Product';
import { ImageService } from '@services/Image';
import { PaginationResultDTO } from '@dto/Pagination';
import configService from '../Config';
import { Queries } from '@dto/Queries/constructor';
import HistoryPublicService from '@services/History/public';
import QueryBuilderService from '@services/QueryBuilder';

@Injectable()
export default class ProductService {
    dashboardPortion: number;

    constructor(
        @InjectRepository(ProductEntity) protected readonly productRepo: Repository<ProductEntity>,
        protected readonly imageService: ImageService,
        protected readonly historyService: HistoryPublicService,
        private readonly qbService: QueryBuilderService,
        protected readonly FSService: FSService,
    ) {
        this.dashboardPortion = +configService.getVal('DASHBOARD_PORTION');
    }

    /**
     * @description get common product query builder
     * @returns query builder
     */
    getProductQueryBulder(): SelectQueryBuilder<ProductEntity> {
        return this.productRepo
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.properties', 'properties')
            .leftJoinAndSelect('product.images', 'images')
            .leftJoinAndSelect('properties.property_group', 'property_group');
    }

    /**
     * @description render product search result with filters, sorting and pagination
     * @param qb query builder to continue building query
     * @param searchParams
     * @param resultMapConstructor constructor for maping result. by default will return ProductEntity
     * @returns completed search result with pagination
     */
    async renderResult<T>(
        qb: SelectQueryBuilder<ProductEntity>,
        searchParams: Queries,
        resultMapConstructor?: any,
    ): Promise<PaginationResultDTO<T>> {
        const { status, dinamicFilters, sort, price } = searchParams;

        // filtering by dinamical filters
        if (dinamicFilters) this.qbService.qbWithDinamicFilters.call(qb, dinamicFilters);
        if (price) this.qbService.qbWithPrice.call(qb, price);

        this.qbService.qbWithSorting.call(qb, sort);
        this.qbService.qbWithSellStatus.call(qb, status);

        return this.qbService.qbWithPagination.call(qb, searchParams, resultMapConstructor);
    }
}
