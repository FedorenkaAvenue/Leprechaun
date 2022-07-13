import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from './sevices/products.service';
import { ProductsApiService } from 'src/app/shared/services/products/products-api.service';
import { ConfirmationDialogModule } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.module';
import { ModalModule } from 'src/app/shared/modules/modal/modal.module';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsPageComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatIconModule,
    ModalModule,
    ConfirmationDialogModule,
  ],
  providers: [
    ProductsService,
    ProductsApiService,
  ]
})
export class ProductsModule { }
