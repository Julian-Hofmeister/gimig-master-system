import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { LogoutSettingComponent } from './logout-setting/logout-setting.component';
import { FontModalComponent } from './font-modal/font-modal.component';
import { TitleModalComponent } from './title-modal/title-modal.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private modalCtrl: ModalController, private router: Router) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

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

  // ----------------------------------------------------------------------------------------------

  openTitleModal() {
    this.modalCtrl
      .create({
        component: TitleModalComponent,
        cssClass: 'small-setting-css',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  // ----------------------------------------------------------------------------------------------

  openFontModal() {
    // this.modalCtrl
    //   .create({
    //     component: FontModalComponent,
    //     cssClass: 'logout-confirm-css',
    //   })
    //   .then((modalEl) => {
    //     modalEl.present();
    //   });
  }

  // ----------------------------------------------------------------------------------------------

  openBackgroundImgModal() {
    // this.modalCtrl
    //   .create({
    //     component: LogoutSettingComponent,
    //     cssClass: 'logout-confirm-css',
    //   })
    //   .then((modalEl) => {
    //     modalEl.present();
    //   });
  }

  // ----------------------------------------------------------------------------------------------

  openColorModal() {
    // this.modalCtrl
    //   .create({
    //     component: LogoutSettingComponent,
    //     cssClass: 'logout-confirm-css',
    //   })
    //   .then((modalEl) => {
    //     modalEl.present();
    //   });
  }

  // ----------------------------------------------------------------------------------------------

  closeSettings() {
    this.router.navigate(['/', 'home']);
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
