import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PropertiesGroupPayload } from 'src/app/shared/models/properties.model';
import { ProperiesService } from '../../services/properies.service';

@Component({
  selector: 'app-create-properties-group',
  templateUrl: './create-properties-group.component.html',
  styleUrls: ['./create-properties-group.component.scss'],
})
export class CreatePropertiesGroupComponent implements OnInit {
  constructor(
    private readonly properiesService: ProperiesService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  public saveForm(data: PropertiesGroupPayload): void {
    this.properiesService.createPropertiesGroup(data).subscribe(res => {
      this.toastr.success('properties group was created');
      this.router.navigate(['/admin/properties'])
    });
  }
}
