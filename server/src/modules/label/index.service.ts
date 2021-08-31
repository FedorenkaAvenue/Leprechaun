import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

import { CreateLabelDTO, CreateLabelDTOConstructor } from "./index.dto";
import { LabelEntity } from "./index.entity";

@Injectable()
export class LabelService {
    constructor(
		@InjectRepository(LabelEntity) private readonly labelRepo: Repository<LabelEntity>
	) {}

	createLabel(label: CreateLabelDTO): Promise<LabelEntity> {
		return this.labelRepo.save(new CreateLabelDTOConstructor(label));
	}

	getAllLabels(): Promise<LabelEntity[]> {
		return this.labelRepo.find();
	}

	deleteLabel(labelId: number): Promise<DeleteResult> {
		return this.labelRepo.delete({ id: labelId });
	}
}
