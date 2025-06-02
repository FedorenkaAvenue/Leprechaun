import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

import { User, UserDTO } from './user.interface';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @GrpcMethod('UserService', 'FindOne')
    findOne({ id, email }: UserDTO, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<User | null> {
        return this.userService.getUser(id ? { id } : { email });
    }
}
