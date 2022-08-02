import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  @Output() onToggleDrawer = new EventEmitter<void>()
  constructor() { }

  ngOnInit(): void {
  }

  public toggleDrawer() {
    this.onToggleDrawer.emit();
  }
}
