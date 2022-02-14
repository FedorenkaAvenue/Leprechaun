import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardModule } from '@shared/components/dashboard/dashboard.module';
import { HomeComponent } from './components/home/home.component';
import { HomeApiService } from '@shared/services/api_es/home-api/home-api.service';
import { HomeService } from './services/home.service';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeBannerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DashboardModule
  ],
  providers: [
    HomeApiService,
    HomeService
  ]
})
export class HomeModule { }
