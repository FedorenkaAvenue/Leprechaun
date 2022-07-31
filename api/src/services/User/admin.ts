import { Injectable } from '@nestjs/common';
import UserHelperService from './helper';

@Injectable()
export default class UserAdminService extends UserHelperService {}
