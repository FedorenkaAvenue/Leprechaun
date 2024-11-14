import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import PropertyGroupService from '.';
import { PropertyGroupI } from '@interfaces/PropertyGroup';
import { PropertyGroupEntity, PropertyGroupPreviewEntity } from '@entities/PropertGroup';
import { CategoryI } from '@interfaces/Category';
import { CreatePropertyGroupDTO } from '@dto/PropertyGroup/private';

@Injectable()
export default class PropertyGroupPrivateService extends PropertyGroupService {
    public async getGroup(id: PropertyGroupI['id']): Promise<PropertyGroupEntity> {
        try {
            return await this.propertyGroupRepo.findOneOrFail({
                where: { id },
                relations: { categories: true },
            });
        } catch (_) {
            throw new NotFoundException('property group not found');
        }
    }

    public async getGroupList(): Promise<PropertyGroupPreviewEntity[]> {
        return await this.propertyGroupRepo.find();
    }

    public async getGroupListByCategoryID(id: CategoryI['id']): Promise<PropertyGroupPreviewEntity[]> {
        return await this.propertyGroupRepo.find({
            where: { categories: { id } },
        });
    }

    public async createGroup(newGroup: CreatePropertyGroupDTO): Promise<PropertyGroupEntity> {
        try {
            return await this.propertyGroupRepo.save(newGroup);
        } catch (err) {
            throw new BadRequestException(err?.detail);
        }
    }

    // async updateGroup(id: PropertyGroupI['id'], data: CreatePropertyGroupDTO): Promise<PropertyGroupEntity> {
    //     const res = await this.propertyGroupRepo.preload({ id: Number(id) });

    //     console.log(res);

    //     return await this.propertyGroupRepo.save(res);
    // }

    public async deleteGroup(groupId: number): Promise<DeleteResult> {
        return await this.propertyGroupRepo.delete({ id: groupId });
    }
}
