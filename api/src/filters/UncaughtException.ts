import { ExceptionFilter, Catch, ArgumentsHost, InternalServerErrorException } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { DevLogMail } from '@dto/Mail/constructor';
import MailService from '@services/Mail';
import ConfigService from '@services/Config';

/**
 * @description catch uncaughted error and send mail log
 */
@Catch(InternalServerErrorException, QueryFailedError)
export default class UncaughtExceptionFilter implements ExceptionFilter {
    constructor(private readonly mailService: MailService, private readonly configService: ConfigService) {}

    catch(exception: InternalServerErrorException | QueryFailedError, host: ArgumentsHost) {
        if (this.configService.isDev) return;

        const timestamp = new Date().toISOString();
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
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

        this.mailService.sendErrorLogMail(log);

        console.error(log);

        response.sendStatus(500);
    }
}
