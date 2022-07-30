import { Injectable } from '@nestjs/common';

import { ISession } from '@interfaces/Session';
import { ProductService } from './Product';
import { IProductPreview } from '@interfaces/Product';

@Injectable()
export default class UserService {
	constructor(
		private readonly productService: ProductService
	) { }
	getHistory(history: ISession['history']): Promise<IProductPreview[]> {
		return this.productService.getProductPreviewList(history);
	}
}
