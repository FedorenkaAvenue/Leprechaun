import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PropertiesGroupDto } from 'src/app/shared/models/properties.model';

@Component({
  selector: 'app-property-group-preview-card',
  templateUrl: './property-group-preview-card.component.html',
  styleUrls: ['./property-group-preview-card.component.scss']
})
export class PropertyGroupPreviewCardComponent implements OnInit {

  @Input() propetiesGroupData: PropertiesGroupDto;
  @Output() removeProp = new EventEmitter<number>()

  
  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  removePropertiesGroup(): void {
  }


  public removeProperty(id?: number): void {
    this.removeProp.emit(id);
  }
  
  public navigateToEditPropertiesGroup(): void {
    this.router.navigate(['/admin/properties/properties-group/edit', this.propetiesGroupData.id]);
  }

}
