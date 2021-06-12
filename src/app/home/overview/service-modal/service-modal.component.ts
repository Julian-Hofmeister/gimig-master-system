import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Table } from '../../table.model';
import { TableService } from '../../table.service';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.component.html',
  styleUrls: ['./service-modal.component.scss'],
})
export class ServiceModalComponent implements OnInit {
  @Input() table: Table;
  passedTime: any;

  constructor(
    private modalCtrl: ModalController,
    private tableService: TableService
  ) {}

  ngOnInit() {
    this.passedTime = Date.now() - this.table.serviceTimestamp;
    console.log(this.passedTime);
  }

  acceptServiceRequest() {
    this.tableService.acceptServiceRequest(this.table);
    this.onCloseModal();
  }

  onCloseModal() {
    this.modalCtrl.dismiss();
  }
}
