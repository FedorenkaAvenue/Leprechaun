import { Component, Input, OnInit } from '@angular/core';
import { CategoryDto } from 'src/app/shared/models/categories.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @Input() categories: CategoryDto[];

  constructor() { }

  ngOnInit(): void {
  }

}
