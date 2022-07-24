import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './wrapper.component';
import { HeaderModule } from '../header/header.module';
import { WrapperRoutingModule } from './wrapper.routing.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    WrapperComponent
  ],
  imports: [
    CommonModule,
    WrapperRoutingModule,
    HeaderModule,
    TranslateModule.forChild()
  ]
})
export class WrapperModule { }
