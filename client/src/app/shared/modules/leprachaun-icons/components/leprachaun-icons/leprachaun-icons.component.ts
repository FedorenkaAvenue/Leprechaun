import {DOCUMENT} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  Optional,
  SimpleChange
} from '@angular/core';
import { LeprachaunIconColor, leprachaunIconColorsList } from '../../leprachaun-icons';
import {LeprachaunIconRegistryService} from '../../services/leprachaun-icon-registry.service';

@Component({
  selector: 'app-seazone-icon',
  templateUrl: './leprachaun-icons.component.html',
  styleUrls: ['./leprachaun-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeprachaunIconsComponent implements OnInit {

  private svgIcon: SVGElement;
  private iconName: string;
  private iconColor: LeprachaunIconColor;
  private strokeColor: LeprachaunIconColor;
  private iconWidth: string | number;
  private iconHeight: string | number;
  private mouseover: boolean;


  ngOnChanges(changes: SimpleChange): any {

  }

  
  @Input()
  set name(iconName: string) {
    if (iconName === this.iconName) {
      return;
    }
    this.iconName = iconName;
    if (this.svgIcon) {
      this.elementRef.nativeElement.removeChild(this.svgIcon);
    }
    const svgData = this.seazoneIconRegistryService.getIcon(iconName);
    if (!svgData) {
      return;
    }
    this.svgIcon = this.svgElementFromString(svgData);
    if (this.iconColor) {
      this.svgIcon.style.fill = this.findColor(this.iconColor);
    }
    if (this.strokeColor) {
      this.svgIcon.style.stroke = this.findColor(this.strokeColor);
    }
    if (this.iconWidth) {
      this.svgIcon.setAttribute('width', `${this.iconWidth}px`);
    }
    if (this.iconHeight) {
      this.svgIcon.setAttribute('height', `${this.iconHeight}px`);
    }
    this.elementRef.nativeElement.appendChild(this.svgIcon);
  }

  @Input()
  set color(color: LeprachaunIconColor) {
    this.iconColor = color;
    if (this.svgIcon && color) {
      this.svgIcon.setAttribute('fill', this.findColor(color));
    }
  }

  @Input()
  set strokedColor(color: LeprachaunIconColor) {
    this.strokeColor = color;
    if (this.svgIcon && color) {
      this.svgIcon.setAttribute('stroke', this.findColor(color));
    }
  }

  @Input() set width(val: string | number) {
    this.iconWidth = val;
    if (this.svgIcon && val) {
      this.svgIcon.setAttribute('width', `${val}px`);
    }
  }

  @Input() set height(val: string | number) {
    this.iconHeight = val;
    if (this.svgIcon && val) {
      this.svgIcon.setAttribute('height', `${val}px`);
    }
  }

  @Input() hoverColor: LeprachaunIconColor;
  @Input() hoverStrokeColor: LeprachaunIconColor;

  @HostListener('mouseover')
  onMouseOver() {
    if (this.mouseover) {
      return;
    }
    this.mouseover = true;
    if (this.hoverColor) {
      this.svgIcon.style.fill = this.findColor(this.hoverColor);
    }
    if (this.hoverStrokeColor) {
      this.svgIcon.style.stroke = this.findColor(this.hoverStrokeColor);
    }
  }

  @HostListener('mouseout')
  onMouseOut() {
    if (!this.mouseover) {
      return;
    }
    this.mouseover = false;
    if (this.hoverColor) {
      this.svgIcon.style.fill = this.findColor(this.iconColor);
    }
    if (this.strokeColor) {
      this.svgIcon.style.stroke = this.findColor(this.strokeColor);
    }
  }

  constructor(
    private readonly elementRef: ElementRef,
    private readonly cdr: ChangeDetectorRef,
    private readonly seazoneIconRegistryService: LeprachaunIconRegistryService,
    @Optional() @Inject(DOCUMENT) private readonly document: any,
  ) {
  }

  ngOnInit() {
  }

  private svgElementFromString(svgContent: string): SVGElement {
    const div = this.document.createElement('DIV');
    div.innerHTML = svgContent;
    return div.querySelector('svg') || this.document.createElementNS('http://www.w3.org/2000/svg', 'path');
  }

  private findColor(color: LeprachaunIconColor): string {
    const selectedColor = leprachaunIconColorsList.find(item => item.name === color);
    if (!selectedColor) {
      return '#ffffff';
    }
    return selectedColor.color;
  }

}
