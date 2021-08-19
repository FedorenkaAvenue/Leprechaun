import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { CategoryDto } from 'src/app/shared/models/categories.model';
import { OverlayService } from 'src/app/shared/modules/modal/services/overlay.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit {
  public categories$: Observable<CategoryDto[]>;

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly router: Router,
    private readonly overlayService: OverlayService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.categoriesService.init();
    this.categories$ = this.getCategories();
  }

  private getCategories(): Observable<CategoryDto[]> {
    return this.categoriesService.getCategories();
  }

  public goToCategProds(url: string): void {
    this.router.navigate(['/admin/products/list', url]);
  }

  public deleteCategory(id: number): void {
    this.overlayService
      .open(ConfirmationDialogComponent, {})
      .afterClosed$.pipe(
        take(1),
        switchMap((res) => {
          if (res.data) {
            return this.categoriesService.deleteCategory(id);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        this.toastr.success('category was deleted');
        this.categoriesService.updateCategories();
      });
  }
}
