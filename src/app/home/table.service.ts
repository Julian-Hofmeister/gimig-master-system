import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from './order.model';
import { Table } from './table.model';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  tableNumber = localStorage.getItem('tableNumber');
  tables: Observable<any[]>;
  tableCollection: AngularFirestoreCollection<Table>;
  tableDocument: AngularFirestoreDocument<Table>;
  orderCollection: AngularFirestoreCollection<Order>;
  orders: Observable<any[]>;
  orderDoc: AngularFirestoreDocument<Order>;

  path = this.afs.collection('restaurants').doc('julian@web.de');

  constructor(public afs: AngularFirestore) {}

  getTables() {
    // GETS REFERENCE
    this.tableCollection = this.path.collection('tables', (ref) =>
      ref.orderBy('tableNumber')
    );

    this.tables = this.tableCollection.snapshotChanges().pipe(
      map(
        (changes) =>
          changes.map((a) => {
            const data = a.payload.doc.data() as Table;
            data.id = a.payload.doc.id;

            return data;
          }),
        console.log('GETTING TABLES...')
      )
    );
    return this.tables;
  }

  // GET ITEMS
  getOrders(table: Table) {
    // GETS REFERENCE
    this.orderCollection = this.path.collection('/orders', (ref) =>
      ref.where('tableNumber', '==', table.tableNumber.toString())
    );

    // GETS ITEMS
    this.orders = this.orderCollection.snapshotChanges().pipe(
      map((changes) =>
        changes.map((a) => {
          const data = a.payload.doc.data() as Order;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );
    return this.orders;
  }

  acceptOrder(order: Order) {
    // GET REFERENCE
    this.orderDoc = this.path.collection('orders').doc(order.id);

    // UPDATE ORDER TO FIRESTORE
    this.orderDoc.update({
      isAccepted: true,
      isOrdered: false,
    });
  }

  completeOrderRequest(table: Table) {
    this.tableDocument = this.path
      .collection('tables')
      .doc(table.tableNumber.toString());
    this.tableDocument.update({
      orderRequest: false,
      isAccepted: true,
    });
  }

  acceptServiceRequest(table: Table) {
    this.tableDocument = this.path
      .collection('tables')
      .doc(table.tableNumber.toString());
    this.tableDocument.update({
      serviceRequest: false,
      serviceTimestamp: null,
    });
  }

  acceptPayRequest(table: Table) {
    this.tableDocument = this.path
      .collection('tables')
      .doc(table.tableNumber.toString());
    this.tableDocument.update({
      payRequest: false,
      payRequestTimestamp: null,
    });
  }

  // deleteOrder(order: Order) {
  //   // GET REFERENCE
  //   this.orderDoc = this.path.collection('orders').doc(order.id);

  //   // UPDATE ORDER TO FIRESTORE
  //   this.orderDoc.delete();
  // }
}
