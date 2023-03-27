import { Injectable } from '@nestjs/common';

import { SEService } from '@services/SE';

@Injectable()
export default class SearchService {
    constructor(protected readonly SEService: SEService) {}
}
