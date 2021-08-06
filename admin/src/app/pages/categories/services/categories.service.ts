import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/models/categories.model';
import { CategoriesApiService } from 'src/app/shared/services/categories/categories-api.service';

@Injectable()
export class CategoriesService {

  constructor(
    private readonly categoriesApiService: CategoriesApiService
  ) { }

  public getCategories(): Observable<CategoryDto[]> {
    return this.categoriesApiService.getCategories()
  }

  public createCategory(data: any): Observable<any> {
    return this.categoriesApiService.createCategory(data)
  }
}
