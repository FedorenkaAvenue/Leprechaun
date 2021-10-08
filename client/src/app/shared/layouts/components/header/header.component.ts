import { Component, OnInit } from '@angular/core';
import { LANGUAGES } from '@shared/static/languages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public languages = LANGUAGES;
  constructor() { }

  ngOnInit(): void {
    const array = ['folly', 'dolly', 'molly', 'sally', 'berry'];
    const count = 2;
    let initial = []
  }

}
