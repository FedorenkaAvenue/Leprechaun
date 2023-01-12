import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PropertyDto } from 'src/app/shared/models/properties.model';
@Component({
  selector: 'app-property-preview-card',
  templateUrl: './property-preview-card.component.html',
  styleUrls: ['./property-preview-card.component.scss']
})
export class PropertyPreviewCardComponent implements OnInit {

  @Input() propetyData: PropertyDto;
  @Output() removeProp = new EventEmitter<number>()
  constructor(
 
  ) { }

  ngOnInit(): void {
  }

  public removeProperty(event: Event) {
    event.stopPropagation();    
    this.removeProp.emit(this.propetyData.id)
  }
}
