import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './wrapper.component';
import { HeaderModule } from '../header/header.module';
import { WrapperRoutingModule } from './wrapper.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FooterModule } from '../footer/footer.module';



@NgModule({
  declarations: [
    WrapperComponent
  ],
  imports: [
    CommonModule,
    WrapperRoutingModule,
    HeaderModule,
    FooterModule,
    TranslateModule.forChild()
  ]
})
export class WrapperModule { }
