import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

export function ValidateDTO(DTO: any, field: string = 'body'): MethodDecorator {
    return function (target, propertyKey, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const body = field === 'body' ? args[0] : args.find(arg => typeof arg === 'object' && field in arg)?.[field];
            const dto = plainToInstance(DTO, body);
            const errors = await validate(dto);

            if (errors.length > 0) {
                const message = errors.map(e => Object.values(e.constraints || {})).flat().join(', ');
                throw new RpcException({ status: status.INVALID_ARGUMENT, message });
            }

            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}
