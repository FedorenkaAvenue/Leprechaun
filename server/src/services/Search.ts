import { Injectable } from '@nestjs/common';

import ManticoreService from './Manticore';

@Injectable()
export class SearchService {
    constructor(
		private readonly manticoreService: ManticoreService
	) {}

    async searchByString(searchExp: string) {
		const res = await this.manticoreService.searchProduct(decodeURI(searchExp));

		return res;
	}
}
