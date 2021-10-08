import { Component, Input, OnInit } from '@angular/core';
import { Languages } from '@shared/models';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})
export class LanguageSwitchComponent implements OnInit {


  @Input() languages: Array<Languages>
  
  constructor() { }

  ngOnInit(): void {
  }

}
