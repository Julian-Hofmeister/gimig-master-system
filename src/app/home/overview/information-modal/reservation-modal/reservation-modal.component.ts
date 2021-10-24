import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Table } from 'src/app/home/table.model';
import { TableService } from 'src/app/home/table.service';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss'],
})
export class ReservationModalComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() table: Table;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  reservationTime: number;

  minuteValues: string[] = ['0', '15', '30', '45'];
  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private modalCtrl: ModalController,
    private tableService: TableService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {}

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onChange(reservationTime: number) {
    // console.log(new Date(reservationTime).getTime());
  }

  // ----------------------------------------------------------------------------------------------

  onReserve() {
    this.onDismiss();

    console.log(new Date(this.reservationTime).getTime());

    const reservationTimestamp = new Date(this.reservationTime).getTime();

    this.tableService.reserveTable(this.table, reservationTimestamp);
  }

  // ----------------------------------------------------------------------------------------------

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
