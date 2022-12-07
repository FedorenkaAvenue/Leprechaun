import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import PropertyGroupService from '.';
import { PropertyGroupI } from '@interfaces/PropertyGroup';
import { CreatePropertyGroupDTO } from '@dto/PropertyGroup';
import { PropertyGroup } from '@dto/PropertyGroup/constructor';
import { PropertyGroupEntity } from '@entities/PropertGroup';

@Injectable()
export default class PropertyGroupPrivateService extends PropertyGroupService {
    async getGroup(id: PropertyGroupI['id']): Promise<PropertyGroupEntity> {
        try {
            return await this.propertyGroupRepo.findOneOrFail({
                where: { id },
                relations: ['properties'],
            });
        } catch (_) {
            throw new NotFoundException('property group not found');
        }
    }

    async getGroupList(): Promise<PropertyGroupEntity[]> {
        return await this.propertyGroupRepo.find();
    }

    async createGroup(newGroup: CreatePropertyGroupDTO): Promise<PropertyGroupEntity> {
        try {
            return await this.propertyGroupRepo.save(new PropertyGroup(newGroup));
        } catch (err) {
            throw new BadRequestException(err?.detail);
        }
    }

    async updateGroup(id: PropertyGroupI['id'], data: CreatePropertyGroupDTO): Promise<UpdateResult> {
        return await this.propertyGroupRepo.update({ id }, { ...data });
    }

    async deleteGroup(groupId: number): Promise<DeleteResult> {
        return await this.propertyGroupRepo.delete({ id: groupId });
    }
}
