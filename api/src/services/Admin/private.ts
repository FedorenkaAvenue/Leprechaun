import { Injectable } from '@nestjs/common';

import AdminService from '.';

@Injectable()
export default class AdminPrivateService extends AdminService {
    public async clearCache(): Promise<void> {
        await this.cacheService.resetCache();
    }
}
