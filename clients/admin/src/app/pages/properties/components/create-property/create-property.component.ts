import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PropertiesGroupDto, PropertiesGroupPayload } from 'src/app/shared/models/properties.model';
import { ProperiesService } from '../../services/properies.service';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent implements OnInit {

  public propertyGroups$: Observable<Array<PropertiesGroupDto>>
  
  constructor(
    private readonly propertiesService: ProperiesService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.propertyGroups$ = this.getPropertyGroups();

  }

  public saveForm(data: PropertiesGroupPayload): void {
    this.propertiesService.createProperty(data).subscribe(res => {
      this.toastr.success('property was created');
      this.router.navigate(['/admin/properties'])
    });
  }

  private getPropertyGroups(): Observable<Array<PropertiesGroupDto>> {
    return this.propertiesService.getPropertiesGroups();
  }
}
