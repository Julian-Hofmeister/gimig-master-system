import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Restaurant } from '../../restaurant.model';
import { RestaurantService } from '../../restaurant.service';
import { TableService } from '../../table.service';

@Component({
  selector: 'app-title-modal',
  templateUrl: './title-modal.component.html',
  styleUrls: ['./title-modal.component.scss'],
})
export class TitleModalComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  welcomeMessage = '';

  maxLength = 30;
  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private modalCtrl: ModalController,
    private restaurantService: RestaurantService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.fetchRestaurantData();
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onChange() {
    console.log(this.welcomeMessage);
  }

  // ----------------------------------------------------------------------------------------------

  onSave() {
    this.restaurantService.changeWelcomeMessage(this.welcomeMessage);

    this.onDismiss();
  }

  // ----------------------------------------------------------------------------------------------

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  // ----------------------------------------------------------------------------------------------
  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchRestaurantData() {
    this.restaurantService.getRestaurantData().subscribe((restaurant) => {
      const fetchedRestaurant: Restaurant = {
        welcomeMessage: restaurant.welcomeMessage,
        id: restaurant.id,
      };
      console.log(fetchedRestaurant.welcomeMessage);

      this.welcomeMessage = fetchedRestaurant.welcomeMessage;
    });
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion
}
