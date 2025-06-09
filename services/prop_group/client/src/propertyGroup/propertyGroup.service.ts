import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, firstValueFrom, from, map, Observable, switchMap, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import { PropertyGroupEntity } from './propertyGroup.entity';
import { PropertyGroup, PropertyGroupCU } from 'gen/ts/prop_group';
import TransService from '@common/trans/trans.service';

@Injectable()
export default class PropertyGroupService {
    constructor(
        @InjectRepository(PropertyGroupEntity) private readonly propertyGroupRepo: Repository<PropertyGroupEntity>,
        private readonly transService: TransService,
    ) { }

    public createGroup(newGroup: PropertyGroupCU): Observable<PropertyGroup> {
        return this.transService.createTrans(newGroup.title).pipe(
            switchMap(titleTrans => from(this.propertyGroupRepo.save({ ...newGroup, title: titleTrans.id })).pipe(
                map(group => ({
                    ...group,
                    title: titleTrans.data,
                    properties: [],
                })),
                catchError(err => {
                    this.transService.getTrans({ id: titleTrans.id });

                    if (err.code === '23505') {
                        return throwError(() => new RpcException({ code: status.UNAVAILABLE, message: err.detail }));
                    }

                    return throwError(() => new RpcException({ code: err.code, message: err.message }));
                })
            )),
            catchError(err => throwError(() => new RpcException(err))),
        )
    }

    public async getGroup(groupId: PropertyGroup['id']): Promise<PropertyGroup> {
        const group = await this.propertyGroupRepo.findOne({
            where: { id: groupId },
            relations: { properties: true },
            order: { properties: { createdAt: 'DESC' } },
        });

        if (!group) throw new RpcException({
            code: status.NOT_FOUND,
            message: `property group with id ${groupId} not found`
        });

        const { items: transItems } = await firstValueFrom(
            this.transService.getTransMap({
                ids: [
                    group.title,
                    ...group.properties.map(({ title }) => title),
                ],
            })
        );

        return {
            ...group,
            title: transItems[group.title],
            properties: group.properties.map(prop => ({ ...prop, title: transItems[prop.title] }))
        };
    }

    public async getGroupList(isPreview: boolean, isPublic?: boolean): Promise<PropertyGroup[]> {
        const propGroups = await this.propertyGroupRepo.find({
            order: { createdAt: 'DESC' },
            relations: { properties: !isPreview },
        });

        if (!propGroups.length) return [];

        const { items: transItems } = await firstValueFrom(
            this.transService.getTransMap({
                ids: [
                    ...propGroups.map(p => p.title),
                    ...propGroups.map(p => p.properties.map(prop => prop.title)).flat()
                ],
            })
        );

        return propGroups.map(propGroup => ({
            ...propGroup,
            title: transItems[propGroup.title],
            properties: propGroup.properties.map(prop => ({ ...prop, title: transItems[prop.title] })),
        }));
    }

    public async updateGroup(id: PropertyGroup['id'], { title, ...restUpdates }: PropertyGroupCU): Promise<void> {
        const group = await this.propertyGroupRepo.findOneBy({ id });

        if (!group) throw new RpcException({ code: status.UNAVAILABLE, message: `unknown group with id ${id}` });

        this.transService.updateTrans({ id: group.id, data: title }).pipe(
            catchError(err => throwError(() => new RpcException(err)))
        )

        const { affected } = await this.propertyGroupRepo.update({ id }, restUpdates);

        if (!affected) throw new RpcException({ code: status.NOT_FOUND, message: 'Property group doesnt changed' });
    }
}

