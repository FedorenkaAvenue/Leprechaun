import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PropertyGroupCreateDTO, PropertyGroupUpdateDTO } from './propertyGroup.dto';
import { PropertyGroupPreviewI } from './propertyGroup.interface';
import { PropertyGroupI } from '@core/propertyGroup/propertyGroup.interface';
import { PropertyGroupEntity } from '@core/propertyGroup/propertyGroup.entity';
import { CategoryI } from '@core/category/category.interface';

@Injectable()
export default class PropertyGroupService {
    constructor(
        @InjectRepository(PropertyGroupEntity) protected readonly propertyGroupRepo: Repository<PropertyGroupEntity>,
    ) { }

    public async getGroup(id: PropertyGroupI['id']): Promise<PropertyGroupI | null> {
        return await this.propertyGroupRepo.findOne({
            where: { id },
            relations: { categories: true },
            order: { properties: { created_at: 'DESC' } },
        });
    }

    public async getGroupList(): Promise<PropertyGroupPreviewI[]> {
        return await this.propertyGroupRepo.find({
            order: { created_at: 'DESC' },
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
