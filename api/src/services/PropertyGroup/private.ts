import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import PropertyGroupService from '.';
import { PropertyGroupI } from '@interfaces/PropertyGroup';
import { CreatePropertyGroupDTO } from '@dto/PropertyGroup';
import { PropertyGroup } from '@dto/PropertyGroup/constructor';
import { PropertyGroupEntity } from '@entities/PropertGroup';

@Injectable()
export default class PropertyGroupPrivateService extends PropertyGroupService {
    async getGroup(id: PropertyGroupI['id']): Promise<PropertyGroupEntity> {
        return await this.getGroupByID(id);
    }

    async getGroupList(): Promise<PropertyGroupEntity[]> {
        return await this.getGroups();
    }

    async createGroup(newGroup: CreatePropertyGroupDTO): Promise<PropertyGroupEntity> {
        return await this.propertyGroupRepo.save(new PropertyGroup(newGroup));
    }

    async deleteGroup(groupId: number): Promise<DeleteResult> {
        return await this.propertyGroupRepo.delete({ id: groupId });
    }
}