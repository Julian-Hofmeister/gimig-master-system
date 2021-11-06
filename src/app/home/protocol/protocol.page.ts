import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../order.model';
import { TableService } from '../table.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.page.html',
  styleUrls: ['./protocol.page.scss'],
})
export class ProtocolPage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  currentTime: Date;

  intervalId;

  selectedTimestamp = Date.now();

  // ----------------------------------------------------------------------------------------------

  orders: Order[] = [];

  food: Order[] = [];

  beverages: Order[] = [];

  // ----------------------------------------------------------------------------------------------

  bill = 0;

  // ----------------------------------------------------------------------------------------------

  pdfObj;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private orderSub = new Subscription();

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private tableService: TableService) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.getOrders();

    this.roundTime();
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    this.orderSub.unsubscribe();

    clearInterval(this.intervalId);
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onNextDay() {
    this.selectedTimestamp = this.selectedTimestamp + 86400000;

    this.bill = null;

    this.roundTime();

    this.getOrders();
  }

  // ----------------------------------------------------------------------------------------------

  onPreviousDay() {
    this.selectedTimestamp = this.selectedTimestamp - 86400000;

    this.bill = null;

    this.roundTime();

    this.getOrders();
  }

  // ----------------------------------------------------------------------------------------------

  onDownloadPDF() {
    const items = [['Uhrzeit', 'Tischnummer', 'Gericht/Getränk', 'Preis']];

    for (const order of this.orders) {
      const item = [
        new Date(order.orderTimestamp).toLocaleTimeString(),
        'Tisch ' + order.tableNumber.toString(),
        order.name,
        order.price.toString() + '€',
      ];

      items.push(item);
    }

    const docDefinition = {
      content: [
        {
          text:
            new Date(this.selectedTimestamp).toLocaleDateString() +
            ' - Bestellungen',
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 8],
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: items,
          },

          layout: 'headerLineOnly',
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 5],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        },
      },
      defaultStyle: {
        // alignment: 'justify'
      },
    };

    this.pdfObj = pdfMake.createPdf(docDefinition);

    console.log(this.pdfObj);

    this.pdfObj.download(
      new Date(this.selectedTimestamp).toLocaleDateString() +
        ' - Bestellungen.pdf'
    );
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private getOrders() {
    this.orderSub = this.tableService.getOrders().subscribe((allOrders) => {
      this.orders = [];

      for (const order of allOrders) {
        const fetchedOrder: Order = {
          amount: order.amount,
          description: order.description,
          id: order.id,
          imagePath: order.imagePath,

          isAccepted: order.isAccepted,
          isFood: order.isFood,
          isOrdered: order.isOrdered,
          isPaid: order.isPaid,
          isServed: order.isServed,
          isVisible: order.isVisible,

          name: order.name,
          parentId: order.parentId,
          price: order.price,

          tableNumber: order.tableNumber,
          orderTimestamp: order.orderTimestamp,
          acceptTimestamp: order.acceptTimestamp,
          payTimestamp: order.payTimestamp,

          isFinished: order.isFinished,
        };

        console.log(
          fetchedOrder.orderTimestamp +
            ' - ' +
            fetchedOrder.name +
            ' - ' +
            fetchedOrder.isAccepted
        );

        if (
          fetchedOrder.orderTimestamp > this.selectedTimestamp &&
          fetchedOrder.orderTimestamp < this.selectedTimestamp + 86400000
        ) {
          // CHECK IF ORDER IS ACCEPTED
          if (fetchedOrder.isAccepted) {
            console.log(fetchedOrder);

            this.orders.push(fetchedOrder);

            // CHECK IF ACCPETED ORDER IS FOOD
            if (fetchedOrder.isFood) {
              this.food.push(fetchedOrder);
            } else {
              this.beverages.push(fetchedOrder);
            }
          }
          this.bill = this.bill + fetchedOrder.price * fetchedOrder.amount;
          console.log('BILL');
          console.log(this.bill);
        }
      }
    });
  }

  // ----------------------------------------------------------------------------------------------

  private roundTime() {
    const d = new Date(this.selectedTimestamp);
    d.setHours(0, 0, 0, 0);

    this.selectedTimestamp = d.getTime();

    console.log(d);

    console.log(this.selectedTimestamp);
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
