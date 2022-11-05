import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Request } from "express"
import { Inject, Injectable, Optional } from "@angular/core"
import { REQUEST } from "@nguniversal/express-engine/tokens"
import { Observable } from "rxjs"
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class WithCredentialsInterceptor implements HttpInterceptor {
  constructor(
    @Optional() @Inject(REQUEST) private readonly request: Request,
    public cookieService: SsrCookieService
    ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req.headers.append('yarovy', 'test')
    const API_KEY = '123456';
    const authReq = req.clone({
      withCredentials: true,
    })
    this.cookieService.set('yarovy', uuidv4(), { sameSite: 'None', secure: false, domain: 'leprechaun.store' })
    return next.handle(authReq)
  }
}