import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { environment } from 'environments/environment.global';

@Component({
  selector: 'lpch-image',
  templateUrl: './lpch-image.component.html',
  styleUrls: ['./lpch-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LpchImageComponent implements OnInit {
  @Input() set src(value) {
    this.imageSrc = `${environment.mediaEndpoint}/${value}`;
  }

  @Input() alt: string;
  public imageSrc: string;
  constructor() {}

  ngOnInit(): void {}
}
