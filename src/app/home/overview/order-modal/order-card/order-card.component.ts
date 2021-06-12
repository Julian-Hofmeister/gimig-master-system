import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/home/order.model';
import { TableService } from 'src/app/home/table.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  @Input() order: Order;

  doubleTapDetector = false;

  constructor(private tableService: TableService) {}

  ngOnInit() {}

  acceptOrder() {
    if (this.doubleTapDetector === true) {
      this.tableService.acceptOrder(this.order);
      this.doubleTapDetector = false;
    } else {
      this.doubleTapDetector = true;
    }
  }
}
