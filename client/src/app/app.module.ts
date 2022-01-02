// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// libs
import { CookieService, CookieModule } from '@gorniv/ngx-universal';
import { TransferHttpCacheModule } from '@nguniversal/common';
// shared
import { SharedModule } from '@shared/shared.module';
// components
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { UniversalStorage } from '@shared/storage/universal.storage';
import { CustomMetaModule } from './core/modules/custom-meta/custom-meta.module';
import { TranslocoModule } from '@ngneat/transloco';
import { LeprachaunIconsModule } from '@shared/modules/leprachaun-icons';
import { AuthService } from '@shared/services/auth/auth.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { LocalStorageService } from '@shared/storage/local.storage';
import { CardApiService } from '@shared/services/api_es/card-api/card-api.service';
import { CardService } from '@shared/services/card/card/card.service';
import { CardStateService } from '@shared/services/card/card-state/card-state.service';
import { WithCredentialsInterceptor } from '@shared/interceptors/with-cred.interceptor';
import { withCredentialsInterceptor } from '@shared/interceptors/withCred.interceptor';
// interceptors

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    TransferHttpCacheModule,
    HttpClientModule,
    RouterModule,
    AppRoutes,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    SharedModule.forRoot(),
    TranslocoModule,
    CustomMetaModule,
    NgSelectModule,
    LeprachaunIconsModule.forRoot(),
  ],
  declarations: [AppComponent],
  providers: [
    CookieService,
    UniversalStorage,
    LocalStorageService,
    AuthService,
    CardService,
    CardApiService,
    CardStateService,
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
