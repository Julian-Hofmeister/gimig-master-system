export interface Table {
  tableNumber: string;
  orderRequest: boolean;
  payRequest: boolean;
  serviceRequest: boolean;
  serviceMessage: string;

  orderTime: Date;
  serviceTimestamp: number;
  payRequestTimestamp: number;

  status: string;

  ableToPay: boolean;
  paysTogether: boolean;
  paysCache: boolean;

  isServed: boolean;
  isPaid: boolean;
  isAccepted: boolean;

  resetRequest: boolean;

  id: string;
}
