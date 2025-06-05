import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PropertyGroupEntity } from './propertyGroup.entity';
import { PropertyGroup } from 'gen/ts/prop_group';

@Injectable()
export default class PropertyGroupService {
    constructor(
        @InjectRepository(PropertyGroupEntity) private readonly propertyGroupRepo: Repository<PropertyGroupEntity>,
    ) { }

    // public async getGroup(id: PropertyGroup['id']): Promise<PropertyGroup | null> {
    //     return await this.propertyGroupRepo.findOne({
    //         where: { id },
    //         relations: { categories: true },
    //         order: { properties: { created_at: 'DESC' } },
    //     });
    // }

    public async getGroupList(isPreview: boolean, isPublic?: boolean): Promise<PropertyGroup[]> {
        return await this.propertyGroupRepo.find({
            order: { createdAt: 'DESC' },
            relations: { properties: !isPreview },
        });
    }

    // public async getGroupListByCategoryID(id: CategoryI['id']): Promise<PropertyGroupPreviewI[]> {
    //     return await this.propertyGroupRepo.find({
    //         where: { categories: { id } },
    //     });
    // }

    // public async createGroup(newGroup: PropertyGroupCreateDTO): Promise<PropertyGroupI> {
    //     try {
    //         const { id } = await this.propertyGroupRepo.save(newGroup);

    //         return this.propertyGroupRepo.findOneOrFail({
    //             where: { id }, relations: { properties: true },
    //         });
    //     } catch (err) {
    //         throw new BadRequestException(err);
    //     }
    // }

    // async updateGroup(id: PropertyGroupI['id'], updates: PropertyGroupUpdateDTO): Promise<UpdateResult> {
    //     return await this.propertyGroupRepo.update({ id }, updates);
    // }

    // public async deleteGroup(groupId: number): Promise<DeleteResult> {
    //     return await this.propertyGroupRepo.delete({ id: groupId });
    // }
}
