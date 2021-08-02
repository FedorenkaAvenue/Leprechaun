import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { LabelEntity } from "./index.entity";

@Injectable()
export class LabelService {
    constructor(
		@InjectRepository(LabelEntity)
		private readonly labelRepo: Repository<LabelEntity>
	) {}
}
