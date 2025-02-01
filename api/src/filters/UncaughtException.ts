import { ExceptionFilter, Catch, ArgumentsHost, InternalServerErrorException } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { DevLogMail } from '@dto/Mail/constructor';
import ConfigService from '@services/Config';
import MailPrivateService from '@services/Mail/private';

/**
 * @description catch uncaughted error and send mail log
 */
@Catch(InternalServerErrorException, QueryFailedError)
export default class UncaughtExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly mailPrivateService: MailPrivateService,
        private readonly configService: ConfigService,
    ) { }

    catch(exception: InternalServerErrorException | QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (!this.configService.isDev) {
            const timestamp = new Date().toISOString();
            const { url, body, cookies, method, ip } = ctx.getRequest<Request>();
            const { message, stack } = exception;

            const log = new DevLogMail({
                url,
                cookies,
                method,
                body,
                stack,
                message,
                ip,
                timestamp,
            });

            this.mailPrivateService.sendErrorLogMail(log);
        }

        console.error(exception);
        response.sendStatus(500);
    }
}
