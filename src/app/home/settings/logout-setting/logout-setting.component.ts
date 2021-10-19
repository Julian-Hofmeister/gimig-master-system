import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-logout-setting',
  templateUrl: './logout-setting.component.html',
  styleUrls: ['./logout-setting.component.scss'],
})
export class LogoutSettingComponent {
  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////
  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private router: Router
  ) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////
  public onLogout() {
    console.log('LOGGING OUT...');
    this.authService.logout();
    this.modalCtrl.dismiss();
  }

  public onDismiss() {
    this.modalCtrl.dismiss();
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion
}
