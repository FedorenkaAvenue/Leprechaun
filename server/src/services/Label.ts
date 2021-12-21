import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CreateLabelDTO, CreateLabelDTOConstructor } from '@dto/Label';
import { LabelEntity } from '@entities/Label';
import { ILabel } from '@interfaces/Label';

@Injectable()
export class LabelService {
    constructor(
		@InjectRepository(LabelEntity) private readonly labelRepo: Repository<LabelEntity>
	) {}

	async createLabel(label: CreateLabelDTO): Promise<void> {
		await this.labelRepo.save(new CreateLabelDTOConstructor(label));
	}

	getAllLabels(): Promise<ILabel[]> {
		return this.labelRepo.find();
	}

	deleteLabel(labelId: number): Promise<DeleteResult> {
		return this.labelRepo.delete({ id: labelId });
	}
}
