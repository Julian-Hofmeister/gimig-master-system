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
import '@angular/common/locales/global/en-GB';
import { AllOrderModalComponent } from './order-modal/all-order-modal/all-order-modal.component';
import { ResetConfirmModalComponent } from './information-modal/reset-confirm-modal/reset-confirm-modal.component';
import { CommunicationModalComponent } from './information-modal/communication-modal/communication-modal.component';
import { ActionCardComponent } from './information-modal/communication-modal/action-card/action-card.component';

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
    AllOrderModalComponent,
    ResetConfirmModalComponent,
    CommunicationModalComponent,
    ActionCardComponent,
  ],
})
export class OverviewPageModule {}
