import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeBannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
