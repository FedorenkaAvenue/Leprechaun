import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersListComponent implements OnInit {
  @Input() list: any;
  constructor() { }

  ngOnInit(): void {
  }

}
