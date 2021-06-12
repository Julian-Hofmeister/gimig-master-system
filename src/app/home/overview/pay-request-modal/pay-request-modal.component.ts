import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Table } from '../../table.model';
import { TableService } from '../../table.service';

@Component({
  selector: 'app-pay-request-modal',
  templateUrl: './pay-request-modal.component.html',
  styleUrls: ['./pay-request-modal.component.scss'],
})
export class PayRequestModalComponent implements OnInit {
  @Input() table: Table;
  passedTime: any;
  paysTogether: string;
  paysCache: string;

  constructor(
    private modalCtrl: ModalController,
    private tableService: TableService
  ) {}

  ngOnInit() {
    this.paysTogether = this.table.paysTogether ? 'Zusammen' : 'Getrennt';
    this.paysCache = this.table.paysCache ? 'Bar' : 'mit Karte';

    this.passedTime = Date.now() - this.table.payRequestTimestamp;
    console.log(this.passedTime);
  }

  acceptPayRequest() {
    this.tableService.acceptPayRequest(this.table);
    this.onCloseModal();
  }

  onCloseModal() {
    this.modalCtrl.dismiss();
  }
}
