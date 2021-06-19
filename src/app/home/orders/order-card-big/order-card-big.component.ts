import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Order } from '../../order.model';
import { TableService } from '../../table.service';

@Component({
  selector: 'app-order-card-big',
  templateUrl: './order-card-big.component.html',
  styleUrls: ['./order-card-big.component.scss'],
})
export class OrderCardBigComponent implements OnInit {
  @Input() order: Order;

  currentTime: number;
  doubleTapDetector = false;

  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.currentTime = new Date().getTime();
  }

  acceptOrder() {
    if (this.doubleTapDetector === true) {
      this.tableService.acceptOrder(this.order);
      this.doubleTapDetector = false;
    } else {
      this.doubleTapDetector = true;
    }
  }
}
