import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import PropertyGroupService from '.';
import { PropertyGroupI, PropertyGroupPreviewI } from '@interfaces/PropertyGroup';
import { CategoryI } from '@interfaces/Category';
import { PropertyGroupCreateDTO, PropertyGroupUpdateDTO } from '@dto/PropertyGroup/private';

@Injectable()
export default class PropertyGroupPrivateService extends PropertyGroupService {
    public async getGroup(id: PropertyGroupI['id']): Promise<PropertyGroupI | null> {
        return await this.propertyGroupRepo.findOne({
            where: { id },
            relations: { categories: true },
        });
    }

    public async getGroupList(): Promise<PropertyGroupPreviewI[]> {
        return await this.propertyGroupRepo.find({
            order: {
                created_at: 'DESC',
            }
        });
    }

    public async getGroupListByCategoryID(id: CategoryI['id']): Promise<PropertyGroupPreviewI[]> {
        return await this.propertyGroupRepo.find({
            where: { categories: { id } },
        });
    }

    public async createGroup(newGroup: PropertyGroupCreateDTO): Promise<PropertyGroupI> {
        try {
            const { id } = await this.propertyGroupRepo.save(newGroup);

            return this.propertyGroupRepo.findOneOrFail({
                where: { id }, relations: { properties: true },
            });
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async updateGroup(id: PropertyGroupI['id'], updates: PropertyGroupUpdateDTO): Promise<UpdateResult> {
        return await this.propertyGroupRepo.update({ id }, updates);
    }

    public async deleteGroup(groupId: number): Promise<DeleteResult> {
        return await this.propertyGroupRepo.delete({ id: groupId });
    }
}
