import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProtocolPageRoutingModule } from './protocol-routing.module';

import { ProtocolPage } from './protocol.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProtocolPageRoutingModule],
  declarations: [ProtocolPage],
})
export class ProtocolPageModule {}
