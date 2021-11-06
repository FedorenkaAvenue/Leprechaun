import { PipeTransform, Injectable, NotAcceptableException } from '@nestjs/common';

/**
 * @description validate page path range number
 * @param pageNumber valid page range is 1-5
 */
@Injectable()
export class DashboardParamPipe implements PipeTransform {
	transform(pageNumber: number) {
		if (pageNumber < 1 || pageNumber > 5) throw new NotAcceptableException();

		return pageNumber;
	}
}
