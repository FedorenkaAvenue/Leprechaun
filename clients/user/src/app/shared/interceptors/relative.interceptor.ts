import { isPlatformServer } from "@angular/common";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable, Injector, PLATFORM_ID } from "@angular/core";
import { REQUEST } from "@nguniversal/express-engine/tokens";

@Injectable()
export class RelativePathInterceptor implements HttpInterceptor {
    constructor(
        private readonly injector: Injector,
        @Inject(PLATFORM_ID) private platformId: string,
        
        ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
      if (request.url.startsWith('assets') && isPlatformServer(this.platformId)) {
        const req = this.injector.get(REQUEST);
        const url = req.protocol + '://' + req.get('host') + '/' + request.url;
        request = request.clone({
          url: url
        });
      }
      return next.handle(request);
    }
}