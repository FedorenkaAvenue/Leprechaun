import { status } from "@grpc/grpc-js";
import {
    BadRequestException, InternalServerErrorException, NotAcceptableException, NotFoundException, UnauthorizedException,
} from "@nestjs/common";
import { catchError, Observable, throwError } from "rxjs";

/**
 * @description catch error from responce and throw RestAPI exeption
 * @param {Observable} source 
 * @returns {Error} RestAPI exception
 */
export function catchResponceError<T>(source: Observable<T>): Observable<T> {
    return source.pipe(
        catchError(({ code, details }) => throwError(() => {
            switch (code) {
                case status.NOT_FOUND:
                    return new NotFoundException(details);
                case status.INVALID_ARGUMENT:
                    return new BadRequestException(details);
                case status.ALREADY_EXISTS:
                    return new NotAcceptableException(details);
                case status.UNAUTHENTICATED:
                    return new UnauthorizedException(details);
                default:
                    return new InternalServerErrorException(details);
            }
        }))
    )
}
