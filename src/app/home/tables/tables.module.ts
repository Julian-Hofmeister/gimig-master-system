import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablesPageRoutingModule } from './tables-routing.module';

import { TablesPage } from './tables.page';
import { TableDetailCardComponent } from './table-detail-card/table-detail-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TablesPageRoutingModule],
  declarations: [TablesPage, TableDetailCardComponent],
})
export class TablesPageModule {}
