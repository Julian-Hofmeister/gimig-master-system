import { Component, Input, OnInit } from '@angular/core';
import { Table } from 'src/app/home/table.model';

@Component({
  selector: 'app-communication-modal',
  templateUrl: './communication-modal.component.html',
  styleUrls: ['./communication-modal.component.scss'],
})
export class CommunicationModalComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() table: Table;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  selectedMessage: string;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor() {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {}

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  // selectCard(message: string) {
  //   // this.reorderBeverages = false;
  //   // this.offerDessert = false;
  //   // this.sendGreetings = false;
  //   // this.showReview = false;
  //   this.selectedMessage = message;
  //   console.log(this.selectedMessage);
  // }
  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
