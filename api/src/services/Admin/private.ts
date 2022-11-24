import { Injectable } from '@nestjs/common';

import AdminService from '.';

@Injectable()
export default class AdminPrivateService extends AdminService {}
