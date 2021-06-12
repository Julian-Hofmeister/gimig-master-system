import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { LogoutSettingComponent } from './logout-setting/logout-setting.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {}

  openLogoutSetting() {
    this.modalCtrl
      .create({
        component: LogoutSettingComponent,
        cssClass: 'logout-confirm-css',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  closeSettings() {
    this.router.navigate(['/', 'home']);
  }
}
