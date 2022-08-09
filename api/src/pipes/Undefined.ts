import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

/**
 * @description validate undefined value
 */
@Injectable()
export class UndefinedPipe implements PipeTransform {
    transform(val: any) {
        if (typeof val === 'undefined') throw new BadRequestException('undefined param');

        return val;
    }
}
