import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import PropertyGroupService from '.';
import { PropertyGroupI, PropertyGroupPreviewI } from '@interfaces/PropertyGroup';
import { CategoryI } from '@interfaces/Category';
import { CreatePropertyGroupDTO } from '@dto/PropertyGroup/private';

@Injectable()
export default class PropertyGroupPrivateService extends PropertyGroupService {
    public async getGroup(id: PropertyGroupI['id']): Promise<PropertyGroupI | null> {
        return await this.propertyGroupRepo.findOne({
            where: { id },
            relations: { categories: true },
        });
    }

    public async getGroupList(): Promise<PropertyGroupPreviewI[]> {
        return await this.propertyGroupRepo.find();
    }

    public async getGroupListByCategoryID(id: CategoryI['id']): Promise<PropertyGroupPreviewI[]> {
        return await this.propertyGroupRepo.find({
            where: { categories: { id } },
        });
    }

    public async createGroup(newGroup: CreatePropertyGroupDTO): Promise<PropertyGroupI> {
        try {
            return await this.propertyGroupRepo.save(newGroup);
        } catch (err) {
            throw new BadRequestException(err);
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
