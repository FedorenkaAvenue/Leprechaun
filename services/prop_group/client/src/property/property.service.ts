import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { status } from '@grpc/grpc-js';

import { PropertyEntity } from './property.entity';
import { Property, PropertyCU } from 'gen/property';
import TransService from '@common/trans/trans.service';
import PropertyMapper from './property.mapper';

@Injectable()
export default class PropertyService {
    constructor(
        @InjectRepository(PropertyEntity) private readonly propertyRepo: Repository<PropertyEntity>,
        private readonly transService: TransService,
    ) { }

    public createProperty({ title, ...restProperty }: PropertyCU): Observable<Property> {
        return this.transService.createTrans(title).pipe(
            switchMap(({ id, data }) => from(this.propertyRepo.save({ ...restProperty, title: id })).pipe(
                map(newProp => PropertyMapper.toView(newProp, data)),
                catchError(err => {
                    this.transService.getTrans({ id });

                    return throwError(() => new RpcException({ code: err.code, message: err.message }))
                })
            )
            ),
            catchError(err => throwError(() => new RpcException({ code: err.code, message: err.message })))
        );
    }

    public getPropertyList(ids?: Property['id'][]): Observable<Property[]> {
        return from(this.propertyRepo.findBy(ids ? { id: In(ids) } : {})).pipe(
            switchMap(props => from(this.transService.getTransMap({ ids: props.map(p => p.title) })).pipe(
                map(transMap => props.map(prop => PropertyMapper.toView(prop, transMap.items[prop.title])))
            )),
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
