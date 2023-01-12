import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.global';
import {
  PropertiesGroupDto,
  PropertiesGroupPayload,
} from '../../models/properties.model';

@Injectable()
export class PropertiesApiService {
  private readonly apiUrl = `${environment?.apiEndpoint}`;

  constructor(private readonly http: HttpClient) {}

  public getPropertiesGroups(): Observable<Array<PropertiesGroupDto>> {
    return this.http.get<Array<PropertiesGroupDto>>(
      `${this.apiUrl}/adm/propertygroup/list`
    );
  }

  public createPropertiesGroup(data: PropertiesGroupPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/adm/propertygroup`, data);
  }

  public createProperty(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/adm/property`, data);
  }

  public getPropertiesGroupsByCategoryId(id: string): Observable<Array<PropertiesGroupDto>> {
    return this.http.get<Array<PropertiesGroupDto>>(
      `${this.apiUrl}/adm/propertygroup/list/${id}`
    );
  }

  public removeProperty(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/adm/property/${id}`);
  }

}
