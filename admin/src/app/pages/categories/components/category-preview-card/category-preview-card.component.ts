import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryDto } from 'src/app/shared/models/categories.model';

@Component({
  selector: 'app-category-preview-card',
  templateUrl: './category-preview-card.component.html',
  styleUrls: ['./category-preview-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPreviewCardComponent implements OnInit {

  @Input() category: CategoryDto;
  @Output() onGoToCategProds = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  public goToCategProds(url: string): void {
    this.onGoToCategProds.emit(url)
  }
}
