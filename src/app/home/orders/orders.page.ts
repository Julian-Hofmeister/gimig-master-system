import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { Order } from '../order.model';
import { TableService } from '../table.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {
  // # SUBSCRIPTIONS
  orderSub = new Subscription();

  // # LISTS
  newOrders: Order[] = [];
  acceptedOrders: Order[] = [];

  newFood: Order[] = [];
  newBeverages: Order[] = [];

  // # PROPERTIES
  bill = 0;

  // # CONSTRUCTOR
  constructor(
    private afStorage: AngularFireStorage,
    // # SERVICES
    private tableService: TableService
  ) {}

  // # ON INIT
  ngOnInit() {
    this.orderSub = this.tableService.getOrders().subscribe((allOrders) => {
      this.newOrders = [];
      this.acceptedOrders = [];

      for (const order of allOrders) {
        const fetchedOrder: Order = {
          amount: order.amount,
          description: order.description,
          id: order.id,
          imagePath: order.imagePath,

          isAccepted: order.isAccepted,
          isFood: order.isFood,
          isOrdered: order.isOrdered,
          isPaid: order.isPaid,
          isServed: order.isServed,
          isVisible: order.isVisible,

          name: order.name,
          parentId: order.parentId,
          price: order.price,

          tableNumber: order.tableNumber,
          orderTimestamp: order.orderTimestamp,
          acceptTimestamp: order.acceptTimestamp,
          payTimestamp: order.payTimestamp,

          isFinished: order.isFinished,
        };

        if (fetchedOrder.isFood) {
          this.newFood.push(fetchedOrder);
        } else {
          this.newBeverages.push(fetchedOrder);
        }
        // CHECK IF ORDER IS ACCEPTED
        if (!fetchedOrder.isAccepted) {
          this.newOrders.push(fetchedOrder);
          // CHECK IF UNACCPETED ORDER IS FOOD
        } else {
          this.acceptedOrders.push(fetchedOrder);
        }
        this.bill = this.bill + fetchedOrder.price;
      }
    });
  }

  ngOnDestroy() {
    this.orderSub.unsubscribe();
  }
}
