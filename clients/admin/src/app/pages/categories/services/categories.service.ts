import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { CategoryDto } from 'src/app/shared/models/categories.model';
import { CategoriesApiService } from 'src/app/shared/services/categories/categories-api.service';

@Injectable()
export class CategoriesService {

  private updateCategories$: Subject<void>;

  constructor(
    private readonly categoriesApiService: CategoriesApiService
  ) { }

  public getCategories(): Observable<CategoryDto[]> {
    return this.updateCategories$.pipe(
      startWith(null),
      switchMap( res => this.categoriesApiService.getCategories())
    )
  }

  public getCategoryByUrl(url: string): Observable<CategoryDto> {
    return this.categoriesApiService.getCategoryByUrl(url);
  }


  public createCategory(data: any): Observable<any> {
    return this.categoriesApiService.createCategory(data);
  }

  public editCategory(data: any): Observable<any> {
    return this.categoriesApiService.editCategory(data);
  }

  public deleteCategory(id: number): Observable<any> {
    return this.categoriesApiService.deleteCategory(id)
  }
  
  public updateCategories(): void {
    this.updateCategories$.next();
  }

  public init(): void {
    this.updateCategories$ = new Subject();
  }

  public destroy(): void {
    this.updateCategories$.complete();
  }

}
