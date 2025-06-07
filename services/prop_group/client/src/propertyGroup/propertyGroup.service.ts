import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import { PropertyGroupEntity } from './propertyGroup.entity';
import { PropertyGroup, PropertyGroupCU } from 'gen/ts/prop_group';
import TransService from '@trans/trans.service';
import { Trans } from 'gen/ts/trans';

@Injectable()
export default class PropertyGroupService {
    constructor(
        @InjectRepository(PropertyGroupEntity) private readonly propertyGroupRepo: Repository<PropertyGroupEntity>,
        private readonly transService: TransService,
    ) { }

    public async createGroup(newGroup: PropertyGroupCU): Promise<PropertyGroup> {
        try {
            const { id, ...title } = await firstValueFrom(
                this.transService.createTrans(newGroup.title).pipe(
                    catchError(err => throwError(() => new RpcException(err)))
                )
            );

            const group = await this.propertyGroupRepo.save({ ...newGroup, title: id });

            return { ...group, title };
        } catch (err: any) {
            if (err.code === '23505') throw new RpcException({ code: status.UNAVAILABLE, message: err.detail });

            throw new RpcException({ code: err.code, message: err.message });
        }
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

        const { id, ...title } = await firstValueFrom(this.transService.getTrans({ id: group.title }));

        return { ...group, title };
    }

    public async getGroupList(isPreview: boolean, isPublic?: boolean): Promise<PropertyGroup[]> {
        const propGroups = await this.propertyGroupRepo.find({
            order: { createdAt: 'DESC' },
            relations: { properties: !isPreview },
        });

        if (!propGroups.length) return [];

        const { items } = await firstValueFrom(
            this.transService.getTransList({
                ids: propGroups.map(p => p.title)
            })
        );

        const translationMap = new Map(items.map(t => [t.id, t]));

        return propGroups.map(propGroup => ({
            ...propGroup,
            title: translationMap.get(propGroup.title) as Trans,
        }));
    }

    async updateGroup(id: PropertyGroup['id'], { title, ...restUpdates }: PropertyGroupCU): Promise<void> {
        const group = await this.propertyGroupRepo.findOneBy({ id });

        if (!group) throw new RpcException({ code: status.UNAVAILABLE, message: `unknown group with id ${id}` });

        this.transService.updateTrans({ id: group.id, data: title }).pipe(
            catchError(err => throwError(() => new RpcException(err)))
        )

        const { affected } = await this.propertyGroupRepo.update({ id }, restUpdates);

        if (!affected) throw new RpcException({ code: status.NOT_FOUND, message: 'Property group doesnt changed' });
    }
}
