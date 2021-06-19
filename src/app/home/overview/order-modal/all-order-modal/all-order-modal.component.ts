import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/home/order.model';
import { Table } from 'src/app/home/table.model';
import { TableService } from 'src/app/home/table.service';

@Component({
  selector: 'app-all-order-modal',
  templateUrl: './all-order-modal.component.html',
  styleUrls: ['./all-order-modal.component.scss'],
})
export class AllOrderModalComponent implements OnInit {
  @Input() table: Table;

  loadedOrders: Order[] = [];
  newOrders: Order[] = [];
  acceptedOrders: Order[] = [];

  dishes: Order[] = [];
  beverages: Order[] = [];

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

          if (fetchedOrder.isFood) {
            this.dishes.push(fetchedOrder);
          } else {
            this.beverages.push(fetchedOrder);
          }

          this.acceptedOrders.push(fetchedOrder);
          this.bill = this.bill + fetchedOrder.price;
        }
      });
  }

  onCloseModal() {
    this.modalCtrl.dismiss();
  }
}
