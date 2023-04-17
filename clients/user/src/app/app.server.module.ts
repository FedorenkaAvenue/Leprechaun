// angular
import { NgModule, ViewEncapsulation, Component } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// components
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
// TODO
// import { InlineStyleComponent } from './inline-style/inline-style.component';
// import { InlineStyleModule } from './inline-style/inline-style.module';
import { CookieService, CookieBackendService, CookieModule, NgxRequest, NgxResponse } from '@gorniv/ngx-universal';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RelativePathInterceptor } from '@shared/interceptors/relative.interceptor';
import { UniversalStorage } from '@shared/storage/universal.storage';

@NgModule({
  imports: [
    // AppModule - FIRST!!!
    AppModule,
    ServerModule,
    NoopAnimationsModule,
    ServerTransferStateModule,
    // InlineStyleModule,
],
  bootstrap: [AppComponent,
    //  InlineStyleComponent
    ],
  providers: [
    { provide: CookieService, useClass: CookieBackendService },
    { 
      provide: NgxRequest, 
      useValue: { cookie: '', headers: {} }, 
    }, 
    { 
      provide: NgxResponse, 
      useValue: {}, 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RelativePathInterceptor,
      multi: true
    },
  ],
})
export class AppServerModule {}
