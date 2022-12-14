import { Injectable } from '@nestjs/common';

import configService from './Config';

@Injectable()
export default class SearchService {
    private api: any;

    constructor() {
        this.api = configService.getSEConfig();
    }

    test() {
        var body = [
            '\'{"insert": {"index": "test", "id": 1, "doc": {"title": "Title 1"}}},\\n{"insert": {"index": "test", "id": 2, "doc": {"title": "Title 2"}}}\'',
        ];

        this.api.bulk(body).then(
            function (data) {
                console.log('API called successfully. Returned data: ' + data);
            },
            function (error) {
                console.error(error);
            },
        );
    }
}
