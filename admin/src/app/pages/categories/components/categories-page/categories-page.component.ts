import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/models/categories.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  public categories$: Observable<CategoryDto[]>;
  
  constructor(
    private readonly categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.getCategories();
  }

  private getCategories(): Observable<CategoryDto[]> {
    return this.categoriesService.getCategories();
  }
}
