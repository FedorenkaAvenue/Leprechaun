import { Injectable } from '@nestjs/common';

import ManticoreService from './Manticore';

@Injectable()
export class SearchService {
    constructor(
		private readonly manticoreService: ManticoreService
	) {}

    async searchProductsByString(searchExp: string) {
		const res = await this.manticoreService.searchByQuery('products', decodeURI(searchExp));

		return res;
	}
}
