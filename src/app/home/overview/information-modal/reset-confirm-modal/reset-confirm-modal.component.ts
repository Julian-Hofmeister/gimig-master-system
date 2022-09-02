import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Table } from 'src/app/home/table.model';
import { TableService } from 'src/app/home/table.service';
import { Order } from 'src/app/home/order.model';

@Component({
  selector: 'app-reset-confirm-modal',
  templateUrl: './reset-confirm-modal.component.html',
  styleUrls: ['./reset-confirm-modal.component.scss'],
})
export class ResetConfirmModalComponent {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() table: Table;

  @Input() loadedOrders: Order[];

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private tableService: TableService,
    private modalCtrl: ModalController
  ) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onReset() {
    this.tableService.resetTable(this.table, this.loadedOrders);
    this.modalCtrl.dismiss();
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
