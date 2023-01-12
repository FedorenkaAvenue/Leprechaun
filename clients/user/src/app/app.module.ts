// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// libs
import { CookieService, CookieModule } from '@gorniv/ngx-universal';
import { TransferHttpCacheModule } from '@nguniversal/common';
// shared
import { SharedModule } from '@shared/shared.module';
// components
// import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { UniversalStorage } from '@shared/storage/universal.storage';
import { LeprachaunIconsModule } from '@shared/modules/leprachaun-icons';
import { AuthService } from '@shared/services/auth/auth.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { LocalStorageService } from '@shared/storage/local.storage';
import { CartApiService } from '@shared/services/api_es/cart-api/cart-api.service';
import { CartService } from '@shared/services/cart/cart/cart.service';
import { CartStateService } from '@shared/services/cart/cart-state/cart-state.service';
import { WithCredentialsInterceptor } from '@shared/interceptors/with-cred.interceptor';
import { withCredentialsInterceptor } from '@shared/interceptors/withCred.interceptor';
import { FavoritesStateService } from '@shared/services/favorite/favorite-state/favorites-state.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'environments/environment.global';
import { AppRoutingModule } from './app-routing.module';
// interceptors


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `/assets/locales/`, '.json');
}
@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    TransferHttpCacheModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    // AppRoutes,
    
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    SharedModule.forRoot(),
    // CustomMetaModule,
    NgSelectModule,
    LeprachaunIconsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [/* PLATFORM_ID, */HttpClient]
      }
    })
  ],
  declarations: [AppComponent],
  providers: [
    CookieService,
    UniversalStorage,
    LocalStorageService,
    AuthService,
    CartService,
    CartApiService,
    CartStateService,
    FavoritesStateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsInterceptor,
      multi: true
    },
    // Guards
    {
      provide: HTTP_INTERCEPTORS,
      useClass: withCredentialsInterceptor,
      multi: true
    }
  ],
})
export class AppModule {}
