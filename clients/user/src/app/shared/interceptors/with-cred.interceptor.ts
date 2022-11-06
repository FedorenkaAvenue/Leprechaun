import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Request } from "express"
import { Inject, Injectable, Optional, PLATFORM_ID } from "@angular/core"
import { REQUEST } from "@nguniversal/express-engine/tokens"
import { Observable } from "rxjs"
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { DOCUMENT, isPlatformBrowser } from "@angular/common"

@Injectable()
export class WithCredentialsInterceptor implements HttpInterceptor {
    constructor(
        @Optional() @Inject(REQUEST) private readonly request: Request,
        @Inject(DOCUMENT) private readonly document: Document,
        public cookieService: SsrCookieService,
        @Inject(PLATFORM_ID) private platformId: string,
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let pzd;

        if (!isPlatformBrowser(this.platformId)) {
            let cookieString = Object.keys(this.request.cookies).reduce((accumulator, cookieName) => {
                accumulator += cookieName + '=' + this.request.cookies[cookieName] + ';';
                return accumulator;
            }, '');

            pzd = req.clone({
                headers: req.headers.set('Cookie', cookieString),
                withCredentials: true
            })
        } else {
            pzd = req.clone({
                withCredentials: true
            })
        }

        return next.handle(pzd)
    }
}
