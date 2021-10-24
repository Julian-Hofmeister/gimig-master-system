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

  // ----------------------------------------------------------------------------------------------

  loadedOrders: Order[];

  order: Order;

  // ----------------------------------------------------------------------------------------------

  tableNumber = localStorage.getItem('tableNumber');

  userEmail = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).email
    : 'null';

  path = this.afs.collection('restaurants').doc(this.userEmail);

  orderCollection = this.path.collection('orders', (ref) =>
    ref.orderBy('orderTimestamp')
  );

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
          ref
            .where('tableNumber', '==', table.tableNumber.toString())
            .orderBy('orderTimestamp')
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

  deleteOrder(order: Order) {
    const orderCartDoc = this.path
      .collection('tables')
      .doc(order.tableNumber.toString())
      .collection('orderedCart')
      .doc(order.id);

    const allOrdersDoc = this.path
      .collection('orders')
      .doc(order.orderTimestamp.toString());

    orderCartDoc.delete();

    allOrdersDoc.delete();

    this.checkIfOrderedCartIsEmpty(order);
  }

  // ----------------------------------------------------------------------------------------------

  acceptOrder(order: Order) {
    const orderCartDoc = this.path
      .collection('tables')
      .doc(order.tableNumber.toString())
      .collection('orderedCart')
      .doc(order.id);

    const allOrdersDoc = this.path
      .collection('orders')
      .doc(order.orderTimestamp.toString());

    const acceptTimestamp = Date.now();

    orderCartDoc.update({
      isAccepted: true,
      isOrdered: false,
      acceptTimestamp,
    });

    allOrdersDoc.update({
      isAccepted: true,
      isOrdered: false,
      acceptTimestamp,
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

  // ----------------------------------------------------------------------------------------------

  sendMessage(message: string, tableNumber: string) {
    console.log(tableNumber);

    const table = this.path.collection('tables').doc(tableNumber.toString());

    table.update({
      message,
    });
  }

  // ----------------------------------------------------------------------------------------------

  reserveTable(table: Table, reservationTimestamp: number) {
    const tableDocument = this.tableCollection.doc(
      table.tableNumber.toString()
    );

    tableDocument.update({ isReserved: true, reservationTimestamp });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private checkIfOrderedCartIsEmpty(order) {
    const collectionData = this.path
      .collection('tables')
      .doc(order.tableNumber.toString())
      .collection('orderedCart')
      .get()
      .toPromise()
      .then((query) => query.size);

    collectionData.then((collectionSize) => {
      if (collectionSize === 0) {
        this.path
          .collection('tables')
          .doc(order.tableNumber.toString())
          .update({
            isOrdered: false,
            orderRequest: false,
          });
      }
    });
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion
}
