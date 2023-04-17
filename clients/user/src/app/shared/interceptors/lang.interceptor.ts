import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Inject, Injectable, Optional, PLATFORM_ID, SkipSelf } from "@angular/core";
import { CookieService } from "@gorniv/ngx-universal";
import { REQUEST, RESPONSE } from "@nguniversal/express-engine/tokens";
import { LocalStorageService } from "@shared/storage/local.storage";
import { UniversalStorage } from "@shared/storage/universal.storage";
import { isPlatformBrowser } from "@angular/common";

@Injectable()
export class LangInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService,
    @Optional() @Inject(REQUEST) private readonly request: Request,
    @Optional() @Inject(RESPONSE) private readonly response: Response,
    @Inject(PLATFORM_ID) private platformId: string,
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let lang = this.cookieService.get('LOCALIZE_DEFAULT_LANGUAGE') as string; 

    if(req.url.match('api')) {
      if (!isPlatformBrowser(this.platformId)) {
        lang = this.request.url.split('/')[1];
      }
      const newReq = req.clone({
        params: (req.params ? req.params : new HttpParams())
                   .set('lang', lang)
      });
      return next.handle(newReq);
    }
    
    return next.handle(req);
  }
}