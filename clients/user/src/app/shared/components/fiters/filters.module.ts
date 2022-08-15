import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersListComponent } from './components/filters-list/filters-list.component';
import { FilterCheckboxComponent } from '../../../pages/products/components/products-filter/components/filter-checkbox/filter-checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FiltersListComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FiltersListComponent
  ]
})
export class FiltersModule { }
