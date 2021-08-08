import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/models/categories.model';
import { CategoriesApiService } from 'src/app/shared/services/categories/categories-api.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  public category$: Observable<CategoryDto>;

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getCategory();
  }

  public saveForm(formData: any): void {
    this.categoriesService.editCategory(formData).subscribe(res => {
     this.router.navigate(['/admin/categories'])
    });
  }

  public getCategory(): void{
    const url = this.getCategoryUrl();
    if(!url) {
      return;
    }
     this.category$ = this.categoriesService.getCategoryByUrl(url);
  }

  private getCategoryUrl(): string | null {
    return this.activatedRoute.snapshot.paramMap.get('url');
  }
}
