import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TabNav } from '@shared/models/shared/tabs/tabs.model';

@Component({
  selector: 'lpch-tabs',
  templateUrl: './lpch-tabs.component.html',
  styleUrls: ['./lpch-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LpchTabsComponent implements OnInit {
  @Input() tabs: Array<TabNav>
  constructor() { }

  ngOnInit(): void {
  }

} 