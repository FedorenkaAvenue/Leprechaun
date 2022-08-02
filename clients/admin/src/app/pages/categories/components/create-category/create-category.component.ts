import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesApiService } from 'src/app/shared/services/categories/categories-api.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  constructor(
    private readonly categoriesApiService: CategoriesService,
    private readonly router: Router,
    private readonly toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  public saveForm(formData: any) {
    this.categoriesApiService.createCategory(formData).subscribe(res => {
      this.toastr.success('category was created');
      this.router.navigate(['/admin/categories'])
    });
  }
}
