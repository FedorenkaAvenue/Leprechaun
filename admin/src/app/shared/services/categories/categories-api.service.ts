import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryDto } from '../../models/categories.model';
import { catchError}   from 'rxjs/operators';
import { CATEGORY_SHORT_LIST } from 'src/app/mock/category';
import { ThrowStmt } from '@angular/compiler';

@Injectable()
export class CategoriesApiService {

  private readonly apiUrl = 'api'
  constructor(
    private readonly http: HttpClient
  ) { }

  public getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.apiUrl}/categories/list`).pipe(
      catchError( () => {
        return of(CATEGORY_SHORT_LIST.map( el => {
          return new CategoryDto(el)
        }))
      })
    )
  }

  public getCategoryByUrl(url: string): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.apiUrl}/category/${url}`)
  }

  public createCategory(data: any): Observable<CategoryDto> {
    const formData  = new FormData();
    formData.append('isActive', data.isActive),
    formData.append('url', data.url),
    formData.append('title', data.title),
    formData.append('icon', data.icon)
    return this.http.post<any>(`${this.apiUrl}/category`, formData).pipe(
    )
  }
  public editCategory(data: any): Observable<CategoryDto> {

    return this.http.patch<any>(`${this.apiUrl}/category`, data).pipe(
    )
  }

  public deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/category/${id}`)
  }
}

