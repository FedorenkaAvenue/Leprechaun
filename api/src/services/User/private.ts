import { Injectable } from '@nestjs/common';

import UserService from '.';

@Injectable()
export default class UserPrivateService extends UserService {}
