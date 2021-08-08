import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryDto } from 'src/app/shared/models/categories.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @Input() categories: CategoryDto[];
  @Output() onGoToCategProds = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public goToCategProds(url: string): void {
    this.onGoToCategProds.emit(url)
  }
}
