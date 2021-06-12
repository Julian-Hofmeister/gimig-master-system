import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { LogoutSettingComponent } from './logout-setting/logout-setting.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SettingsPageRoutingModule],
  declarations: [SettingsPage, LogoutSettingComponent],
})
export class SettingsPageModule {}
