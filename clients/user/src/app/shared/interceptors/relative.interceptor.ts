import { isPlatformServer } from "@angular/common";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { REQUEST } from "@nguniversal/express-engine/tokens";
import { environment } from "environments/environment.global";

@Injectable()
export class RelativePathInterceptor implements HttpInterceptor {
    constructor(
        @Inject(PLATFORM_ID) private platformId: string,
        ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
      if (request.url.startsWith('assets') && isPlatformServer(this.platformId)) {
        const url = environment.domain + '/' + request.url;
        request = request.clone({
          url: url
        });
      }
      return next.handle(request);
    }
}