import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './wrapper.component';
import { HeaderModule } from '../header/header.module';
import { WrapperRoutingModule } from './wrapper.routing.module';



@NgModule({
  declarations: [
    WrapperComponent
  ],
  imports: [
    CommonModule,
    WrapperRoutingModule,
    HeaderModule
  ]
})
export class WrapperModule { }
