import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeprachaunIconRegistryService } from './services/leprachaun-icon-registry.service';

export const leprachaunIconRegistryServiceFactory = (): LeprachaunIconRegistryService => {
  return new LeprachaunIconRegistryService();
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LeprachaunIconsModule {
  public static forRoot(): ModuleWithProviders<LeprachaunIconsModule> {
    return {
      ngModule: LeprachaunIconsModule,
      providers: [
        {
          provide: LeprachaunIconRegistryService,
          useFactory: leprachaunIconRegistryServiceFactory
        }
      ]
    };
  }
}
