import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})
export class LanguageSwitchComponent implements OnInit {


  @Input() languages: Array<string>
  @Input() currentLang: string;
  @Output() changeLang = new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
  }
  
public selectLang(lang: string): void {
  this.changeLang.emit(lang)
} 
}
