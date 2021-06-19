import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from './order.model';
import { Table } from './table.model';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  loadedOrders: Order[];
  tables: Observable<any[]>;
  orders: Observable<any[]>;
  orderSub: Subscription;

  tableDocument: AngularFirestoreDocument<Table>;
  tableCollection: AngularFirestoreCollection<Table>;
  orderCollection: AngularFirestoreCollection<Order>;

  orderDoc: AngularFirestoreDocument<Order>;

  order: Order;

  tableNumber = localStorage.getItem('tableNumber');
  userEmail = JSON.parse(localStorage.getItem('user')).email;
  path = this.afs.collection('restaurants').doc(this.userEmail);

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

  // GET ITEMS
  getAllOrders() {
    // GETS REFERENCE
    this.orderCollection = this.path.collection('/orders');

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
      acceptTimestamp: Date.now(),
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

  resetTable(table: Table) {
    this.tableDocument = this.path
      .collection('tables')
      .doc(table.tableNumber.toString());

    this.tableDocument.update({
      resetRequest: true,
      ableToPay: false,
      orderRequest: false,
      serviceRequest: false,
      orderTime: null,
      paysTogether: null,
      paysCache: null,
      isServed: false,
      isPaid: false,
      isAccepted: false,
      serviceTimestamp: null,
      payRequestTimestamp: null,
    });

    this.orderSub = this.getOrders(table).subscribe((loadedOrders) => {
      for (const order of loadedOrders) {
        console.log(order.id);
        this.orderDoc = this.path.collection('orders').doc(order.id);
        this.orderDoc.update({
          isPaid: true,
          payTimestamp: Date.now(),
        });
      }
      console.log('end');
      this.orderSub.unsubscribe();
    });
  }
}
