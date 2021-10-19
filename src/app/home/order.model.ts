import { Observable } from 'rxjs';

export interface Order {
  amount: number;
  description: string;
  id: string;
  imagePath: Observable<any>;

  isAccepted: boolean;
  isFood: boolean;
  isOrdered: boolean;
  isPaid: boolean;
  isServed: boolean;
  isVisible: boolean;

  name: string;
  parentId: string;
  price: number;

  tableNumber: number;
  orderTimestamp: number;
  acceptTimestamp: number;
  payTimestamp: number;

  isFinished: boolean;
}
