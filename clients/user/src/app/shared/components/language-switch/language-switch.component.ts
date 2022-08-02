import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Languages } from '@shared/models';


@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})
export class LanguageSwitchComponent implements OnInit {


  @Input() languages: Array<Languages>
  @Output() changeLang = new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
  }
  
public selectLang(lang: string): void {
console.log(lang)
  this.changeLang.emit(lang)
} 
}
