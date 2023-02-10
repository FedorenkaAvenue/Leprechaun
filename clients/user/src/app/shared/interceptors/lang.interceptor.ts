import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "@shared/storage/local.storage";

@Injectable()
export class LangInterceptor implements HttpInterceptor {

  constructor(private readonly localStorageService: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const lang = this.localStorageService.getItem('LOCALIZE_DEFAULT_LANGUAGE') as string;
    console.log(lang);
    
    const newReq = req.clone({
      params: (req.params ? req.params : new HttpParams())
                 .set('lang', lang)
    });

    return next.handle(newReq);
  }
}