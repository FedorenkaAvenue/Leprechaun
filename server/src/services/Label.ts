import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CreateLabelDTO, CreateLabelDTOConstructor } from '@dto/Label';
import { LabelEntity } from '@entities/Label';

/**
 * @description /label controller service
 */
@Injectable()
export class LabelService {
    constructor(
		@InjectRepository(LabelEntity) private readonly labelRepo: Repository<LabelEntity>
	) {}

	async createLabel(label: CreateLabelDTO): Promise<void> {
		await this.labelRepo.save(new CreateLabelDTOConstructor(label));
	}

	getAllLabels(): Promise<LabelEntity[]> {
		return this.labelRepo.find();
	}

	deleteLabel(labelId: number): Promise<DeleteResult> {
		return this.labelRepo.delete({ id: labelId });
	}
}
