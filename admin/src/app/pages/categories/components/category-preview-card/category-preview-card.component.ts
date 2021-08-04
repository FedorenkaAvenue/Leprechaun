import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CategoryDto } from 'src/app/shared/models/categories.model';

@Component({
  selector: 'app-category-preview-card',
  templateUrl: './category-preview-card.component.html',
  styleUrls: ['./category-preview-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPreviewCardComponent implements OnInit {

  @Input() category: CategoryDto

  constructor() { }

  ngOnInit(): void {
  }

}
