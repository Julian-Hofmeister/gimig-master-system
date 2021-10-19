import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TableService } from 'src/app/home/table.service';

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss'],
})
export class ActionCardComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() image: string;

  @Input() title: string;

  @Input() message: string;

  @Input() tableNumber: string;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  isSelected = false;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private tableService: TableService,
    private modalCtrl: ModalController
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

  onSelect() {
    this.isSelected = !this.isSelected;
  }

  // ----------------------------------------------------------------------------------------------

  sendMessage(message: string) {
    console.log('SENT MESSAGE' + message);

    this.tableService.sendMessage(message, this.tableNumber);

    this.modalCtrl.dismiss();
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
