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
    return this.http.get<CategoryDto[]>(`${this.apiUrl}/categories`).pipe(
      catchError( () => {
        return of(CATEGORY_SHORT_LIST.map( el => {
          return new CategoryDto(el)
        }))
      })
    )
  }

  public createCategory(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/category`, data).pipe(
    )
  }
}


