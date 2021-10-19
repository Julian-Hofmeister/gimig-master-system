import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Order } from '../../order.model';
import { Table } from '../../table.model';
import { TableService } from '../../table.service';
import { CommunicationModalComponent } from './communication-modal/communication-modal.component';
import { ResetConfirmModalComponent } from './reset-confirm-modal/reset-confirm-modal.component';

@Component({
  selector: 'app-information-modal',
  templateUrl: './information-modal.component.html',
  styleUrls: ['./information-modal.component.scss'],
})
export class InformationModalComponent implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() table: Table;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  beverages: Order[] = [];

  food: Order[] = [];

  bill = 0;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private orderSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private tableService: TableService,
    private afStorage: AngularFireStorage,
    private modalCtrl: ModalController
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    console.log('Information Modal');

    this.fetchOrderFromFirestore();
  }

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

  resetTable() {
    this.modalCtrl.dismiss();

    this.modalCtrl
      .create({
        component: ResetConfirmModalComponent,
        cssClass: 'reset-confirm-css',
        componentProps: { table: this.table },
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

  onOpenCommunicationModal() {
    this.modalCtrl.dismiss();

    this.modalCtrl
      .create({
        component: CommunicationModalComponent,
        cssClass: 'communication-modal-css',
        componentProps: { table: this.table },
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchOrderFromFirestore() {
    this.orderSub = this.tableService
      .getCartOrders(this.table.tableNumber.toString())
      .subscribe((loadedOrders) => {
        this.food = [];
        this.beverages = [];
        this.bill = 0;

        for (const order of loadedOrders) {
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
          };

          console.log(fetchedOrder);

          this.bill = this.bill + fetchedOrder.price;

          if (fetchedOrder.isFood) {
            this.food.push(fetchedOrder);
          } else {
            this.beverages.push(fetchedOrder);
          }
        }
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
