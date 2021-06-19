import { registerLocaleData } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Order } from '../../order.model';
import { Table } from '../../table.model';
import { TableService } from '../../table.service';
import localeFr from '@angular/common/locales/fr';
import { AllOrderModalComponent } from './all-order-modal/all-order-modal.component';

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
})
export class OrderModalComponent implements OnInit {
  @Input() table: Table;
  loadedOrders: Order[] = [];
  newOrders: Order[] = [];
  acceptedOrders: Order[] = [];

  newDishes: Order[] = [];
  newBeverages: Order[] = [];

  doubleTapdetector: string;

  bill = 0;

  private streamSub: Subscription;

  constructor(
    private tableService: TableService,
    private afStorage: AngularFireStorage,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    // GET ITEMS
    this.streamSub = this.tableService
      .getOrders(this.table)
      .subscribe((loadedOrders) => {
        // EMPTY LOCAL ITEMS
        this.loadedOrders = [];
        this.newOrders = [];
        this.acceptedOrders = [];

        // DEFINE NEW ITEM
        for (const order of loadedOrders) {
          const imagePath = this.afStorage
            .ref(order.imagePath)
            .getDownloadURL();

          const fetchedOrder = new Order(
            order.amount,
            order.description,
            order.id,
            imagePath,

            order.isAccepted,
            order.isFood,
            order.isOrdered,
            order.isPaid,
            order.isServed,
            order.isVisible,

            order.name,
            order.parentId,
            order.price,

            order.tableNumber,
            order.orderTimestamp,
            order.acceptTimestamp,
            order.payTimestamp
          );

          // PUSH NEW ITEM

          // CHECK IF PAID
          if (!fetchedOrder.isPaid) {
            // CHECK IF ORDER IS ACCEPTED
            if (fetchedOrder.isAccepted) {
              this.acceptedOrders.push(fetchedOrder);
            } else {
              this.newOrders.push(fetchedOrder);
              // CHECK IF FOOD
              if (fetchedOrder.isFood) {
                this.newDishes.push(fetchedOrder);
              } else {
                this.newBeverages.push(fetchedOrder);
              }
            }

            this.bill = this.bill + fetchedOrder.price;
          }
        }

        if (this.newOrders.length === 0) {
          this.completeOrderRequest();
        }
      });
  }

  acceptAll() {
    for (const order of this.newOrders) {
      this.tableService.acceptOrder(order);
    }
    this.completeOrderRequest();
    this.onCloseModal();
  }

  viewAll(table: Table) {
    this.modalCtrl
      .create({
        component: AllOrderModalComponent,
        cssClass: 'allOrders-modal-css',
        componentProps: { table },
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  completeOrderRequest() {
    this.tableService.completeOrderRequest(this.table);
  }

  onCloseModal() {
    this.modalCtrl.dismiss();
  }
}
