import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, forkJoin, from, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import { PropertyGroupEntity } from './propertyGroup.entity';
import { PropertyGroup, PropertyGroupCU, PropertyGroupPreview } from 'gen/ts/prop_group';
import TransService from '@common/trans/trans.service';
import PropertyGroupMapper from './propertyGroup.mapper';
import CategoryService from '@common/category/category.service';
import EventService from '@common/event/event.service';

@Injectable()
export default class PropertyGroupService {
    constructor(
        @InjectRepository(PropertyGroupEntity) private readonly propertyGroupRepo: Repository<PropertyGroupEntity>,
        private readonly transService: TransService,
        private readonly categoryService: CategoryService,
        private readonly eventService: EventService,
    ) { }

    public createGroup(newGroup: PropertyGroupCU): Observable<PropertyGroup> {
        return this.transService.createTrans(newGroup.title).pipe(
            switchMap(titleTrans => from(this.propertyGroupRepo.save({ ...newGroup, title: titleTrans.id })).pipe(
                map(group => ({
                    ...group,
                    title: titleTrans.data,
                    properties: [],
                    categories: [],
                })),
                catchError(err => {
                    this.transService.getTrans({ id: titleTrans.id });

                    if (err.code == '23505') {
                        return throwError(() => new RpcException({ code: status.ALREADY_EXISTS, message: err.detail }));
                    }

                    return throwError(() => new RpcException({ code: err.code, message: err.message }));
                })
            )),
        )
    }


    public getGroup(groupId: PropertyGroup['id']): Observable<PropertyGroup> {
        return from(this.propertyGroupRepo.findOneBy({ id: groupId })).pipe(
            switchMap(group => {
                if (!group) {
                    return throwError(() =>
                        new RpcException({
                            code: status.NOT_FOUND,
                            message: `property group with id ${groupId} not found`,
                        })
                    );
                }

                return forkJoin([
                    this.categoryService.getCategoryListByPropertyGroups({ propertyGroupId: groupId }),
                    this.transService.getTransMap({
                        ids: [
                            group.title,
                            ...group.properties.map(({ title }) => title),
                        ],
                    }),
                ]).pipe(
                    map(([categories, transMap]) =>
                        PropertyGroupMapper.toView(group, transMap.items, categories.items)
                    )
                );
            })
        );
    }

    public getGroupList(ids?: PropertyGroup['id'][]): Observable<PropertyGroupPreview[]> {
        return from(this.propertyGroupRepo.find({
            order: { createdAt: 'DESC' },
            where: ids ? { id: In(ids) } : {},
        })).pipe(
            switchMap(propGroups => {
                if (!propGroups.length) return of([]);

                return from(
                    this.transService.getTransMap({
                        ids: [
                            ...propGroups.map(p => p.title),
                            ...propGroups.map(p => p.properties.map(prop => prop.title)).flat()
                        ],
                    })
                ).pipe(
                    map(transMap => propGroups.map(group => PropertyGroupMapper.toPreview(group, transMap.items)))
                )
            })
        )
    }

    public updateGroup(id: PropertyGroup['id'], { title, ...restUpdates }: PropertyGroupCU): Observable<void> {
        return from(this.propertyGroupRepo.findOneBy({ id })).pipe(
            switchMap(group => {
                if (!group) throw new RpcException({ code: status.UNAVAILABLE, message: `unknown group with id ${id}` });

                const trans$ = title
                    ? this.transService.updateTrans({ id: group.title, data: title })
                    : of(undefined)

                return forkJoin([
                    trans$,
                    from(this.propertyGroupRepo.update({ id }, restUpdates)),
                ]).pipe(
                    map(([, { affected }]) => {
                        if (!affected) throw new RpcException({ code: status.NOT_FOUND, message: 'Property group doesnt changed' });
                    }),
                    catchError(err => throwError(() => new RpcException(err)))
                )
            })
        );
    }

    public deleteGroup(id: PropertyGroup['id']): Observable<void> {
        return from(this.propertyGroupRepo.findOneBy({ id })).pipe(
            switchMap(group => {
                if (!group) {
                    return throwError(() =>
                        new RpcException({
                            code: status.NOT_FOUND,
                            message: `property group with id ${id} not found`,
                        })
                    );
                }

                return from(this.propertyGroupRepo.delete({ id })).pipe(
                    map(() => {
                        this.eventService.deleteGroup(group);
                    }),
                    catchError(err => throwError(() => new RpcException(err)))
                )
            })
        );
    }
}
