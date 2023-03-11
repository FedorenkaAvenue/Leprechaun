import { Module } from '@nestjs/common';

import FilterPublicController from '@controllers/Filters/public';
import FilterPublicService from '@services/Filter/public';
import PropertyGroupModule from './PropertyGroup';

@Module({
    imports: [PropertyGroupModule],
    controllers: [FilterPublicController],
    providers: [FilterPublicService],
})
export default class FilterModule {}
