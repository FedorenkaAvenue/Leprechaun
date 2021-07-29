import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const array = ['folly', 'dolly', 'molly', 'sally', 'berry'];
    const count = 2;
    let initial = []
  }

}
