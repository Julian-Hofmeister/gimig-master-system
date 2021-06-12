import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Table } from '../table.model';
import { TableService } from '../table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss'],
})
export class TablesPage implements OnInit {
  loadedTables: Table[];

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

        this.loadedTables.push(fetchedTable);
      }
    });
  }
}
