import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryDto } from 'src/app/shared/models/categories.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @Input() categories: CategoryDto[];
  @Output() onGoToCategProds = new EventEmitter<number>();
  @Output() onRemoveCategory = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  public goToCategProds(id: number): void {
    this.onGoToCategProds.emit(id)
  }

  public removeCategory(id: number): void {
    this.onRemoveCategory.next(id);
  }
}
