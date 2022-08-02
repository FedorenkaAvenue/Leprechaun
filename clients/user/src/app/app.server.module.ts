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
import { CookieService, CookieBackendService, CookieModule } from '@gorniv/ngx-universal';

// core
import { TranslocoServerModule } from './core/modules/transloco/transloco-server/transloco-server.module';

@NgModule({
  imports: [
    // AppModule - FIRST!!!
    AppModule,
    ServerModule,
    NoopAnimationsModule,
    ServerTransferStateModule,
    // InlineStyleModule,
    TranslocoServerModule,
],
  bootstrap: [AppComponent,
    //  InlineStyleComponent
    ],
  providers: [
    { provide: CookieService, useClass: CookieBackendService },
  ],
})
export class AppServerModule {}
