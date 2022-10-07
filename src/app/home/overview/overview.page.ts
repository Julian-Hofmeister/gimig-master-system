import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Table } from '../table.model';
import { TableService } from '../table.service';
import { InformationModalComponent } from './information-modal/information-modal.component';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { PayRequestModalComponent } from './pay-request-modal/pay-request-modal.component';
import { ServiceModalComponent } from './service-modal/service-modal.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  activeTables: Table[] = [];

  inActiveTables: Table[] = [];

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private tableSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private modalCtrl: ModalController,
    private tableService: TableService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.fetchTablesFromFirestore();
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    this.tableSub.unsubscribe();
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  openTable(table: Table) {
    this.modalCtrl
      .create({
        component: table.orderRequest
          ? OrderModalComponent
          : table.serviceRequest
          ? ServiceModalComponent
          : table.payRequest
          ? PayRequestModalComponent
          : InformationModalComponent,
        cssClass: table.orderRequest
          ? 'overview-modal-css'
          : table.serviceRequest
          ? 'service-modal-css'
          : table.payRequest
          ? 'pay-request-modal-css'
          : 'information-modal-css',
        componentProps: { table },
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchTablesFromFirestore() {
    this.tableSub = this.tableService.getTables().subscribe((allTables) => {
      this.activeTables = [];
      this.inActiveTables = [];

      for (const table of allTables) {
        const fetchedTable: Table = {
          ...table,
        };

        if (table.orderRequest || table.payRequest || table.serviceRequest) {
          this.activeTables.push(fetchedTable);
        } else {
          this.inActiveTables.push(fetchedTable);
        }
      }
    });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
