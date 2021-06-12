import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OverviewPageRoutingModule } from './overview-routing.module';

import { OverviewPage } from './overview.page';
import { TableCardComponent } from './table-card/table-card.component';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { OrderCardComponent } from './order-modal/order-card/order-card.component';
import { ServiceModalComponent } from './service-modal/service-modal.component';
import { PayRequestModalComponent } from './pay-request-modal/pay-request-modal.component';
import { InformationModalComponent } from './information-modal/information-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OverviewPageRoutingModule],
  declarations: [
    OverviewPage,
    TableCardComponent,
    OrderModalComponent,
    OrderCardComponent,
    ServiceModalComponent,
    PayRequestModalComponent,
    InformationModalComponent,
  ],
})
export class OverviewPageModule {}
