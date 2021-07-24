import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { Observable } from 'rxjs';
import { CustomMetaService } from '../services/custom-meta.service';

@Injectable()
export class MetaGuard implements CanActivate {

  constructor(private readonly meta: CustomMetaService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const url = state.url;
    const meta = route.hasOwnProperty('data') && route.data.meta ? route.data.meta : undefined;
    this.meta.updateStaticRouteMetatags(meta, url);

    return true;
  }

}
