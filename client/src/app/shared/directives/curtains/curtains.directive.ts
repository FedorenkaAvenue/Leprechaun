import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCurtains]'
})
export class CurtainsDirective {

  @Input() appCurtains;
  
  constructor(private element: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    const url = 'url(' + this.appCurtains + ')'
    this.isActive = true;
    this.element.nativeElement.parentElement.style.backgroundImage = url;
  };

  @HostListener('mouseleave') onMouseLeave() {
    this.isActive = false;
  };

  @HostBinding('class.active') isActive = false;
}
