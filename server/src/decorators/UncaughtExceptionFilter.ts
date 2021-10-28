import { ExceptionFilter, Catch, ArgumentsHost, InternalServerErrorException } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

import MailService from '@services/Mail';
import { DevLogMailDTO } from '@dto/Mail';

/**
 * @description catch uncaughted error and send mail log
 */
@Catch(InternalServerErrorException, QueryFailedError)
export class UncaughtExceptionFilter implements ExceptionFilter {
	catch(exception: InternalServerErrorException | QueryFailedError, host: ArgumentsHost) {
		const timestamp = new Date().toISOString();
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const { url, body, cookies, method, ip } = ctx.getRequest<Request>();
		const { message, stack } = exception;

		const log = new DevLogMailDTO({
			url, cookies, method, body, stack, message, ip, timestamp
		});

		MailService.sendErrorLogMail(log);
		console.error(log);

		response.sendStatus(500);
	}
}
