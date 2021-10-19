import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).email
    : 'null';

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private authService: AuthService) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.authService.autoSignIn();
  }

  //#endregion
}
