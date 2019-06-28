import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GameComponent} from './components/game/game.component';
import {GuestService} from './services/guest/guest.service';
import {HttpClientModule} from '@angular/common/http';
import {AllUsersComponent} from './components/all-users/all-users.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {LoginComponent} from './components/login/login.component';
import {UserService} from './services/user/user.service';
import {UtilityService} from './services/utility.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './components/register/register.component';

const DECLARATIONS = [
  AppComponent,
  GameComponent,
  AllUsersComponent,
  LoginComponent,
  RegisterComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GuestService, UserService, UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
