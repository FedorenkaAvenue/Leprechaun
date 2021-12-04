import { Controller, Post } from '@nestjs/common';

@Controller('statistic')
export class StatisticController {
    @Post('/favorite')
    addToFavorite() {
        
    }
}
