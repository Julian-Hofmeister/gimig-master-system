import { registerLocaleData } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Order } from '../../order.model';
import { Table } from '../../table.model';
import { TableService } from '../../table.service';
import localeFr from '@angular/common/locales/fr';
import { AllOrderModalComponent } from './all-order-modal/all-order-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
})
export class OrderModalComponent implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() table: Table;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  allOrders: Order[] = [];

  newDishes: Order[] = [];

  newBeverages: Order[] = [];

  bill = 0;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private orderSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private afStorage: AngularFireStorage,
    private modalCtrl: ModalController,
    private tableService: TableService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.fetchOrderFromFirestore();
  }

  // ----------------------------------------------------------------------------------------------

  ionViewWillEnter() {}

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    this.orderSub.unsubscribe();
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  acceptAll() {
    for (const order of this.allOrders) {
      this.tableService.acceptOrder(order);
    }

    this.tableService.completeOrderRequest(this.table);

    this.onCloseModal();
  }

  // ----------------------------------------------------------------------------------------------

  viewAll(table: Table) {
    this.modalCtrl
      .create({
        component: AllOrderModalComponent,
        cssClass: 'allOrders-modal-css',
        componentProps: { table: this.table, allOrders: this.allOrders },
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  // ----------------------------------------------------------------------------------------------

  onCloseModal() {
    this.modalCtrl.dismiss();
  }

  // ----------------------------------------------------------------------------------------------

  onDelete(order: Order) {
    this.onCloseModal();

    this.modalCtrl
      .create({
        component: DeleteModalComponent,
        cssClass: 'small-action-modal-css',
        componentProps: { table: this.table, order },
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchOrderFromFirestore() {
    console.log(this.table);

    this.orderSub = this.tableService
      .getCartOrders(this.table.tableNumber.toString())
      .subscribe((allOrders) => {
        this.allOrders = [];
        this.newBeverages = [];
        this.newDishes = [];

        for (const order of allOrders) {
          // const imagePath = this.afStorage
          //   .ref(order.imagePath)
          //   .getDownloadURL();

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

            selectedOptions: order.selectedOptions,
            availableOptions: order.availableOptions,

            selectedOptions2: order.selectedOptions2,
            availableOptions2: order.availableOptions2,
          };

          console.log(fetchedOrder);

          this.allOrders.push(fetchedOrder);

          console.log(fetchedOrder.isAccepted);

          if (!order.isAccepted) {
            console.log(fetchedOrder);

            this.bill = this.bill + fetchedOrder.price;

            if (fetchedOrder.isFood) {
              this.newDishes.push(fetchedOrder);
            } else {
              this.newBeverages.push(fetchedOrder);
            }
          }
        }
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
