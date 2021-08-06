import { Component, OnInit } from '@angular/core';
import { CategoriesApiService } from 'src/app/shared/services/categories/categories-api.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  constructor(public categoriesApiService: CategoriesApiService) { }

  ngOnInit(): void {
  }

  public saveForm(formData: any) {
    console.log(formData); 
    this.categoriesApiService.createCategory(formData).subscribe(res => {
      console.log(res);
    });
  }
}
