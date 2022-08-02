import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() totalSize = 1;
  @Input() currentPage = 1;
  @Input() delta = 2;

  @Output() changePage = new EventEmitter<number>();

  public pages: Array<number | null> = [];

  public get max(): number {
    const result = this.currentPage + 2;
    return result < this.totalSize ? result : this.totalSize;
  }

  constructor() {
  }

  ngOnInit() {
    this.updateArrayPages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) {
      return;
    }
    this.updateArrayPages();
  }

  private updateArrayPages(): void {
    this.pages = this.getDisplayedPages();
    this.pages = this.generateRange();
  }

  private getDisplayedPages(): number[] {
    return new Array(this.totalSize).fill(1).map((_, i) => i + 1);
  }

  public onChangePage(page: number): void {
    if (page !== this.currentPage) {
      this.setCurrentPage(page);
    }
  }

  public onNextPage(): void {
    const currentPage = this.currentPage;
    if (currentPage < this.totalSize) {
      this.setCurrentPage(currentPage + 1);
    }
  }

  public onPreviousPage(): void {
    const currentPage = this.currentPage;
    if (currentPage !== 1) {
      this.setCurrentPage(currentPage - 1);
    }
  }

  private setCurrentPage(page: number): void {
    this.currentPage = page;
    this.changePage.emit(page);
    this.updateArrayPages();
  }

  private generateRange(): Array<number | null> {
    const current = this.currentPage;
    const last = this.totalSize;
    const delta = 2;
    const left = current - delta;
    const right = current + delta + 1;
    const rangeWithDots: Array<number | null> = [];
    let l;

    const range = new Array(last).fill(1)
      .map((_, i) => i + 1)
      .filter((value) => value === 1 || value === last || value >= left && value < right);

    // TODO: Refactor
    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push(null);
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  }

}
