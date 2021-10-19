import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Order } from 'src/app/home/order.model';
import { Table } from 'src/app/home/table.model';

@Component({
  selector: 'app-all-order-modal',
  templateUrl: './all-order-modal.component.html',
  styleUrls: ['./all-order-modal.component.scss'],
})
export class AllOrderModalComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() table: Table;

  @Input() allOrders: Order[];

  //#endregion

  //#region [ PROPERTIES ] ////////////////////////////////////////////////////////////////////////

  food: Order[] = [];

  beverages: Order[] = [];

  bill = 0;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private modalCtrl: ModalController) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.sortOrders();
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onCloseModal() {
    this.modalCtrl.dismiss();
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private sortOrders() {
    for (const order of this.allOrders) {
      if (order.isFood) {
        this.food.push(order);
      } else {
        this.beverages.push(order);
      }

      this.bill = this.bill + order.price;
    }
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
