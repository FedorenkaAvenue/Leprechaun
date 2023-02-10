import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PropertiesGroupDto } from 'src/app/shared/models/properties.model';
import { ProperiesService } from '../../services/properies.service';

@Component({
  selector: 'app-properties-groups',
  templateUrl: './properties-groups.component.html',
  styleUrls: ['./properties-groups.component.scss']
})
export class PropertiesGroupsComponent implements OnInit, OnDestroy {

  public propertiesGroups$: Observable<Array<PropertiesGroupDto>>
  constructor(
    private readonly properiesService: ProperiesService,
    private readonly toastr: ToastrService,
  ) { }

  private getPropertiesGroup(): Observable<Array<PropertiesGroupDto>> {
    return this.properiesService.getPropertiesGroups();
  }
  ngOnInit(): void {
    this.properiesService.init();
    this.propertiesGroups$ = this.getPropertiesGroup();
  }

  ngOnDestroy() {
    this.properiesService.destroy();
  }

  public removeProperty(id: number): void {
    this.properiesService.removeProperty(id).subscribe(res => {
      this.toastr.success('properties was deleted');
      this.properiesService.updateProperties();
    })
  }

}
 