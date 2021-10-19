import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from './order.model';
import { Table } from './table.model';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  tables: Observable<any[]>;
  orders: Observable<any[]>;

  loadedOrders: Order[];
  order: Order;

  tableNumber = localStorage.getItem('tableNumber');

  userEmail = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).email
    : 'null';

  path = this.afs.collection('restaurants').doc(this.userEmail);

  orderCollection = this.path.collection('orders');

  tableCollection = this.path.collection('tables', (ref) =>
    ref.orderBy('tableNumber')
  );

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(public afs: AngularFirestore) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  getTables(): Observable<any[]> {
    console.log(this.path);

    this.tables = this.tableCollection.snapshotChanges().pipe(
      map((tables) =>
        tables.map((tableDoc) => {
          const data = tableDoc.payload.doc.data() as Table;
          data.id = tableDoc.payload.doc.id;
          return data;
        })
      )
    );

    return this.tables;
  }

  // ----------------------------------------------------------------------------------------------

  getOrders(table?: Table): Observable<any[]> {
    const orderCollection = table
      ? this.path.collection('orders', (ref) =>
          ref.where('tableNumber', '==', table.tableNumber.toString())
        )
      : this.orderCollection;

    this.orders = orderCollection.snapshotChanges().pipe(
      map((orders) =>
        orders.map((orderDoc) => {
          const data = orderDoc.payload.doc.data() as Order;
          data.id = orderDoc.payload.doc.id;
          return data;
        })
      )
    );

    return this.orders;
  }

  // ----------------------------------------------------------------------------------------------

  getCartOrders(tableNumber: string): Observable<any[]> {
    console.log(this.tableNumber);
    console.log(tableNumber);

    const orderCollection = tableNumber
      ? this.path
          .collection('tables')
          .doc(tableNumber)
          .collection('orderedCart', (ref) =>
            ref.where('isFinished', '==', false)
          )
      : this.orderCollection;

    this.orders = orderCollection.snapshotChanges().pipe(
      map((orders) =>
        orders.map((orderDoc) => {
          const data = orderDoc.payload.doc.data() as Order;
          data.id = orderDoc.payload.doc.id;
          return data;
        })
      )
    );

    return this.orders;
  }

  // ----------------------------------------------------------------------------------------------

  acceptOrder(order: Order) {
    const orderDoc = this.path
      .collection('tables')
      .doc(this.tableNumber)
      .collection('orderedCart')
      .doc(order.id);

    orderDoc.update({
      isAccepted: true,
      isOrdered: false,
      acceptTimestamp: Date.now(),
    });
  }

  // ----------------------------------------------------------------------------------------------

  completeOrderRequest(table: Table) {
    const tableDocument = this.tableCollection.doc(
      table.tableNumber.toString()
    );

    tableDocument.update({
      orderRequest: false,
      isAccepted: true,
      ableToPay: true,
    });
  }

  // ----------------------------------------------------------------------------------------------

  acceptServiceRequest(table: Table) {
    const tableDocument = this.tableCollection.doc(
      table.tableNumber.toString()
    );

    tableDocument.update({
      serviceRequest: false,
      serviceTimestamp: null,
    });
  }

  // ----------------------------------------------------------------------------------------------

  acceptPayRequest(table: Table) {
    const tableDocument = this.tableCollection.doc(
      table.tableNumber.toString()
    );

    tableDocument.update({
      payRequest: false,
      payRequestTimestamp: null,
    });
  }

  // ----------------------------------------------------------------------------------------------

  resetTable(table: Table) {
    const tableDocument = this.tableCollection.doc(
      table.tableNumber.toString()
    );

    tableDocument.update({
      resetRequest: true,
      ableToPay: false,
      orderRequest: false,
      serviceRequest: false,
      payRequest: false,
      orderTime: null,
      paysTogether: null,
      paysCache: null,
      isServed: false,
      isPaid: false,
      isAccepted: false,
      serviceTimestamp: null,
      payRequestTimestamp: null,
    });

    // const orderSub = this.getOrders(table).subscribe((loadedOrders) => {
    //   for (const order of loadedOrders) {
    //     const orderDoc = this.orderCollection.doc(order.id);

    //     orderDoc.update({
    //       isPaid: true,
    //       payTimestamp: Date.now(),
    //     });
    //   }

    //   orderSub.unsubscribe();
    // });
  }

  sendMessage(message: string, tableNumber: string) {
    console.log(tableNumber);

    const table = this.path.collection('tables').doc(tableNumber.toString());

    table.update({
      message,
    });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
