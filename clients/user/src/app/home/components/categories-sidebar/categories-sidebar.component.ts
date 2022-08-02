import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-categories-sidebar',
  templateUrl: './categories-sidebar.component.html',
  styleUrls: ['./categories-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
