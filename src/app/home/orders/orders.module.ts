import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { OrderCardComponent } from '../overview/order-modal/order-card/order-card.component';
import { OrderCardBigComponent } from './order-card-big/order-card-big.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OrdersPageRoutingModule],
  declarations: [OrdersPage, OrderCardBigComponent],
})
export class OrdersPageModule {}
