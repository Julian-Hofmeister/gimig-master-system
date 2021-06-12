import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Order } from '../../order.model';
import { Table } from '../../table.model';
import { TableService } from '../../table.service';

@Component({
  selector: 'app-information-modal',
  templateUrl: './information-modal.component.html',
  styleUrls: ['./information-modal.component.scss'],
})
export class InformationModalComponent implements OnInit {
  @Input() table: Table;
  loadedOrders: Order[] = [];
  newOrders: Order[] = [];
  acceptedOrders: Order[] = [];

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
            order.timestamp
          );

          // PUSH NEW ITEM

          if (!fetchedOrder.isAccepted) {
            this.newOrders.push(fetchedOrder);
          } else {
            this.acceptedOrders.push(fetchedOrder);
            this.bill = this.bill + fetchedOrder.price;
          }
          this.loadedOrders.push(fetchedOrder);
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
  }

  completeOrderRequest() {
    this.tableService.completeOrderRequest(this.table);
  }

  onCloseModal() {
    this.modalCtrl.dismiss();
  }
}
