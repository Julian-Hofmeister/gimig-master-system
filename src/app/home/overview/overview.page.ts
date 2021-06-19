import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
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
export class OverviewPage implements OnInit {
  loadedTables: Table[] = [];
  activeTables: Table[] = [];
  inActiveTables: Table[] = [];

  // SUBS
  private streamSub: Subscription;

  constructor(
    private tableService: TableService,
    private afStorage: AngularFireStorage,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    // GET CATEGORIES
    this.streamSub = this.tableService.getTables().subscribe((tables) => {
      // EMPTY LOCAL CATEGORIES
      this.loadedTables = [];
      this.activeTables = [];
      this.inActiveTables = [];

      // DEFINE NEW CATEGORY
      for (const table of tables) {
        const fetchedTable = new Table(
          table.tableNumber,
          table.orderRequest,
          table.payRequest,
          table.serviceRequest,
          table.orderTime,
          table.serviceTimestamp,
          table.payRequestTimestamp,
          table.status,
          table.ableToPay,
          table.paysTogether,
          table.paysCache,
          table.isServed,
          table.isPaid,
          table.isAccepted,
          table.resetRequest,
          table.id
        );

        if (
          fetchedTable.orderRequest ||
          fetchedTable.payRequest ||
          fetchedTable.serviceRequest
        ) {
          this.activeTables.push(fetchedTable);
        } else {
          this.inActiveTables.push(fetchedTable);
        }
      }
    });
  }

  openTable(table: Table) {
    console.log('CLICKED');
    if (table.orderRequest) {
      this.modalCtrl
        .create({
          component: OrderModalComponent,
          cssClass: 'overview-modal-css',
          componentProps: { table },
        })
        .then((modalEl) => {
          modalEl.present();
        });
    } else if (table.serviceRequest) {
      this.modalCtrl
        .create({
          component: ServiceModalComponent,
          cssClass: 'service-modal-css',
          componentProps: { table },
        })
        .then((modalEl) => {
          modalEl.present();
        });
    } else if (table.payRequest) {
      this.modalCtrl
        .create({
          component: PayRequestModalComponent,
          cssClass: 'pay-request-modal-css',
          componentProps: { table },
        })
        .then((modalEl) => {
          modalEl.present();
        });
    } else if (
      !table.payRequest &&
      !table.serviceRequest &&
      !table.orderRequest
    ) {
      this.modalCtrl
        .create({
          component: InformationModalComponent,
          cssClass: 'information-modal-css',
          componentProps: { table },
        })
        .then((modalEl) => {
          modalEl.present();
        });
    }
  }
}
