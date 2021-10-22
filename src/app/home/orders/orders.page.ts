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
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  newOrders: Order[] = [];

  acceptedOrders: Order[] = [];

  newFood: Order[] = [];

  newBeverages: Order[] = [];

  bill = 0;

  currentTime: Date;

  intervalId;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private orderSub = new Subscription();

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private afStorage: AngularFireStorage,
    private tableService: TableService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.getOrders();

    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    this.orderSub.unsubscribe();

    clearInterval(this.intervalId);
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private getOrders() {
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

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
