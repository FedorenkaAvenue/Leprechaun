import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import {
  PropertiesGroupDto,
  PropertiesGroupPayload,
} from 'src/app/shared/models/properties.model';
import { PropertiesApiService } from 'src/app/shared/services/properties/properties-api.service';

@Injectable()
export class ProperiesService {
  private updateProperties$: Subject<void>;
  constructor(private readonly propertiesApiService: PropertiesApiService) {}

  public getPropertiesGroups(): Observable<Array<PropertiesGroupDto>> {
    return this.updateProperties$.pipe(
      startWith(null),
      switchMap((res) => this.propertiesApiService.getPropertiesGroups())
    );
  }

  public createPropertiesGroup(data: PropertiesGroupPayload): Observable<any> {
    return this.propertiesApiService.createPropertiesGroup(data);
  }

  public createProperty(data: any): Observable<any> {
    return this.propertiesApiService.createProperty(data);
  }

  public removeProperty(id: number): Observable<any> {
    return this.propertiesApiService.removeProperty(id);
  }

  public updateProperties(): void {
    this.updateProperties$.next();
  }

  public init(): void {
    this.updateProperties$ = new Subject();
  }

  public destroy(): void {
    this.updateProperties$.complete();
  }
}
