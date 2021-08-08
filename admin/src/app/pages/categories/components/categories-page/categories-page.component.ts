import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private readonly categoriesService: CategoriesService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.categories$ = this.getCategories();
  }

  private getCategories(): Observable<CategoryDto[]> {
    return this.categoriesService.getCategories();
  }

  public goToCategProds(url: string): void {
    this.router.navigate(['/admin/products/list', url])
  }
}
