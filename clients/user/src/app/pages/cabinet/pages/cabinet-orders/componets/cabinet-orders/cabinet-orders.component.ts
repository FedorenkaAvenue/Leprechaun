import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OrderI } from '@shared/models';
import { Observable } from 'rxjs';
import { CabinetOrdersService } from '../../services/cabinet-orders.service';

@Component({
  selector: 'app-cabinet-orders',
  templateUrl: './cabinet-orders.component.html',
  styleUrls: ['./cabinet-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetOrdersComponent implements OnInit {
  public orders$: Observable<Array<OrderI>>;
  
  constructor(private readonly cabinetOrdersService: CabinetOrdersService) { }

  ngOnInit(): void {
    this.orders$ = this.cabinetOrdersService.getOrderHistory();
  }
  
}
