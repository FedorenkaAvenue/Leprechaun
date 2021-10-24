import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

import MailService from '@services/Mail';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {		
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const { url, body, cookies, method, ip } = ctx.getRequest<Request>();
		const status = exception.getStatus();
		const { message, stack } = exception;

		MailService.sendErrorLogMail({
			path: url,
			body: Object.keys(body).length ? JSON.stringify(body) : 'no',
			cookies: Object.keys(cookies).length ? JSON.stringify(cookies) : 'no',
			method, status, stack, message, ip
		});

		response
			.status(status)
			.json({
				statusCode: status,
				timestamp: new Date().toISOString(),
				path: url,
			});
	}
}
