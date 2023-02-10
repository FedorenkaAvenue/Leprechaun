import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryDto } from '../../models/categories.model';
import { catchError, map}   from 'rxjs/operators';
import { CATEGORY_SHORT_LIST } from 'src/app/mock/category';
import { environment } from 'src/environments/environment.global';
import { objectToFormData } from '../../utils/object-to-form-data';

@Injectable()
export class CategoriesApiService {

  private readonly apiUrl = `${environment?.apiEndpoint}`;

  constructor(
    private readonly http: HttpClient
  ) { }

  public getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.apiUrl}/adm/category/list`).pipe(
      catchError( () => {
        return of(CATEGORY_SHORT_LIST.map( el => {
          return new CategoryDto(el)
        }))
      }),
      map((asdasd: Array<any>) => {
       return asdasd.map(el => new CategoryDto(el))
        
      })
    )
  }

  public getCategoryByUrl(url: string): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.apiUrl}/adm/category/${url}`)
  }

  public createCategory(data: any): Observable<CategoryDto> {
    let formData = objectToFormData(data)
    return this.http.post<any>(`${this.apiUrl}/adm/category`, formData).pipe(
    )
  }
  public editCategory(data: any): Observable<CategoryDto> {

    return this.http.patch<any>(`${this.apiUrl}/adm/category`, data).pipe(
    )
  }

  public deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/adm/category/${id}`)
  }
}

// export function objectToFormData<T>(payload: any): FormData {
//   const formData = new FormData();
//   Object.keys(payload).forEach((key) => {
//     const value = payload[key];
//     if (Array.isArray(value)) {
//       value.forEach((item: string | File, index: number) => formData.append(`${key}[${index}]`, item));
//     } else {
//       if(typeof value === 'object') {
//         return objectToFormData(value)
//       } else {
//         formData.append(key, value);
//       }
//     }
//   });
//   return formData;
// }

