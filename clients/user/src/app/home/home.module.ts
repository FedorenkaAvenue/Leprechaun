import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { HomeRoutes } from './home.routing';
import { HomeComponent } from './home.component';
import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  imports: [CommonModule, HomeRoutes, TranslateModule],
  declarations: [HomeComponent, HomePageComponent],
})
export class HomeModule {}
