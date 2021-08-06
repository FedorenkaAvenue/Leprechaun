import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsApiService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getProductsList(): Observable<any> {
    
  }
}
