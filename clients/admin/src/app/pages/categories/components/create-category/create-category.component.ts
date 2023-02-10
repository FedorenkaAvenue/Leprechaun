import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PropertiesGroupDto } from 'src/app/shared/models/properties.model';
import { CategoriesApiService } from 'src/app/shared/services/categories/categories-api.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  public propertiesGroups$: Observable<Array<PropertiesGroupDto>>
  
  constructor(
    private readonly categoriesApiService: CategoriesService,
    private readonly categoriesService: CategoriesService,
    private readonly router: Router,
    private readonly toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.propertiesGroups$ = this.getPropertyGroups()
  }

  public saveForm(formData: any) {
    this.categoriesApiService.createCategory(formData).subscribe(res => {
      this.toastr.success('category was created');
      this.router.navigate(['/admin/categories'])
    });
  }

  private getPropertyGroups(): Observable<Array<PropertiesGroupDto>> {
    return this.categoriesService.getPropertiesGroups()
  }

}
