import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeprachaunIconRegistryService } from './services/leprachaun-icon-registry.service';
import { LeprachaunIconsComponent } from './components/leprachaun-icons/leprachaun-icons.component';

export const leprachaunIconRegistryServiceFactory = (): LeprachaunIconRegistryService => {
  return new LeprachaunIconRegistryService();
};

@NgModule({
  declarations: [LeprachaunIconsComponent],
  imports: [
    CommonModule
  ],
  exports: [LeprachaunIconsComponent]
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
