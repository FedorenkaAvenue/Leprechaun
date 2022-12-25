import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import PropertyGroupService from '.';
import { PropertyGroupI } from '@interfaces/PropertyGroup';
import { CreatePropertyGroupDTO } from '@dto/PropertyGroup';
import { PropertyGroupEntity } from '@entities/PropertGroup';

@Injectable()
export default class PropertyGroupPrivateService extends PropertyGroupService {
    async getGroup(id: PropertyGroupI['id']): Promise<PropertyGroupEntity> {
        try {
            return await this.propertyGroupRepo.findOneOrFail({
                where: { id },
                relations: ['properties'],
            });
        } catch (err) {
            throw new NotFoundException('property group not found');
        }
    }

    async getGroupList(): Promise<PropertyGroupEntity[]> {
        return await this.propertyGroupRepo.find();
    }

    async createGroup(newGroup: CreatePropertyGroupDTO): Promise<PropertyGroupEntity> {
        try {
            return await this.propertyGroupRepo.save(newGroup);
        } catch (err) {
            throw new BadRequestException(err?.detail);
        }
    }

    // async updateGroup(id: PropertyGroupI['id'], data: CreatePropertyGroupDTO): Promise<PropertyGroupEntity> {
    //     const res = await this.propertyGroupRepo.preload({ id: Number(id), ...data });

    //     console.log(res);

    //     return await this.propertyGroupRepo.save(res);
    // }

    async deleteGroup(groupId: number): Promise<DeleteResult> {
        return await this.propertyGroupRepo.delete({ id: groupId });
    }
}
