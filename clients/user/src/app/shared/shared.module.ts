import { ModuleWithProviders, NgModule } from '@angular/core';

import { TransferHttpModule } from '@gorniv/ngx-universal';

import { LayoutsModule } from './layouts/layouts.module';
// import { SharedMetaModule } from './shared-meta';

@NgModule({
  exports: [LayoutsModule, TransferHttpModule],
  providers: [],
  declarations: [
    
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return { ngModule: SharedModule };
  }
}
