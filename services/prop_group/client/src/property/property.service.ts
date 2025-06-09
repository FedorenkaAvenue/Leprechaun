import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { status } from '@grpc/grpc-js';

import { PropertyEntity } from './property.entity';
import { Property, PropertyCU } from 'gen/ts/prop_group';
import TransService from '@common/trans/trans.service';

@Injectable()
export default class PropertyService {
    constructor(
        @InjectRepository(PropertyEntity) private readonly propertyRepo: Repository<PropertyEntity>,
        private readonly transService: TransService,
    ) { }

    public createProperty({ title, ...restProperty }: PropertyCU): Observable<Property> {
        return this.transService.createTrans(title).pipe(
            switchMap(({ id, data }) =>
                from(this.propertyRepo.save({ ...restProperty, title: id })).pipe(
                    map(newProp => ({ ...newProp, title: data })),
                    catchError(err => {
                        this.transService.getTrans({ id });

                        return throwError(() => new RpcException({ code: err.code, message: err.message }))
                    })
                )
            ),
            catchError(err => throwError(() => new RpcException({ code: err.code, message: err.message })))
        );
    }

    // public async getProperty(id: Property['id']): Promise<Property> {
    //     return this.propertyRepo.findOneBy({ id });
    // }

    // public async updateProperty(id: PropertyI['id'], data: CreatePropertyDTO): Promise<UpdateResult> {
    //     return await this.propertyRepo.update({ id }, { ...data });
    // }

    public async deleteProperty(id: Property['id']): Promise<void> {
        const property = await this.propertyRepo.findOneBy({ id });

        const { affected } = await this.propertyRepo.delete({ id });

        if (!affected || !property) {
            throw new RpcException({ code: status.NOT_FOUND, message: `Property with id ${id} not found` });
        }

        this.transService.deleteTrans({ id: property.title });
    }
}
