import { ExceptionFilter, Catch, ArgumentsHost, InternalServerErrorException } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

import MailService from '../modules/mail/mail.service';
import { DevLogMail } from '../modules/mail/mail.dto';

/**
 * @description catch uncaughted error and send mail log
 */
@Catch(InternalServerErrorException, QueryFailedError)
export default class UncaughtExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly mailService: MailService,
    ) { }

    catch(exception: InternalServerErrorException | QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (!(process.env.IS_DEV === 'true')) {
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

            this.mailService.sendErrorLogMail(log);
        }

        console.error(exception);
        response.sendStatus(500);
    }
}
